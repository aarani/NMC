using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NMC.Caches;
using NMC.Models.Dto;

namespace NMC.Controllers;

[Route("/servers")]
[Authorize]
public class ServersController(NMCDbContext nmcDbContext, ITemplateCache templateCache): ControllerBase
{
    [HttpGet]
    public async Task<IEnumerable<Server>> GetServers()
    {
        var servers = nmcDbContext
                .Servers
                .Select(Server.FromDatabase)
                .ToList();
        using var client = new DockerClientConfiguration().CreateClient();

        var containers = await client.Containers.ListContainersAsync(new ContainersListParameters() { All = true });

        foreach (var server in servers)
        {
            var serverId = server.ServerId.ToString();
            var container = containers.FirstOrDefault(c => c.Names.Any(name => name.Contains(serverId)));
            server.Status = container?.Status?.ToUpper() ?? "UNKNOWN";
        }

        return servers;
    }
    [HttpPut]
    public async Task<ActionResult> CreateServer([FromBody]CreateServerDto createServerDto)
    {
        var serverId = Guid.NewGuid();
        
        if (!createServerDto.Variables.TryGetValue("server_name", out var serverName) ||
            string.IsNullOrWhiteSpace(serverName))
            return BadRequest();
        
        if (!createServerDto.Variables.TryGetValue("server_port", out var serverPort) || string.IsNullOrWhiteSpace(serverPort))
            return BadRequest();
        
        using var client = new DockerClientConfiguration().CreateClient();
        
        var template = await templateCache.GetTemplate(createServerDto.TemplateId);
        var envs = new Dictionary<string, string>(template.Env);
        foreach (var var in template.Variables)
        {
            if (!createServerDto.Variables.TryGetValue(var.Name, out var varValue) ||
                string.IsNullOrWhiteSpace(varValue))
                return BadRequest();
            foreach (var env in envs)
            {
                envs[env.Key] = env.Value.Replace($"${var.Name}$", varValue);
            }
        }

        await client.Images.CreateImageAsync(new ImagesCreateParameters()
            { FromImage = $"{template.ImageName}", Tag = template.ImageTag}, new AuthConfig(), new Progress<JSONMessage>());

        var volumes = new Dictionary<string, string>();
        foreach (var volume in template.GuestVolumes)
        {
            var id = $"{Guid.NewGuid()}{Guid.NewGuid()}";
            var volumeResponse = await client.Volumes.CreateAsync(new VolumesCreateParameters() { Driver = "local", Name = id });
            volumes.Add(volume, volumeResponse.Name);
        }

        Dictionary<string, IList<PortBinding>> portBindings = [];
        portBindings.Add("25565/tcp", new List<PortBinding>() { new PortBinding() { HostPort = $"{int.Parse(serverPort)}" } });

        Dictionary<string, EmptyStruct> exposedPorts = [];
        exposedPorts.Add("25565/tcp", new EmptyStruct());

        var containerOptions =
            new CreateContainerParameters()
            {
                Tty = true,
                OpenStdin = true,
                Env = envs.Select((k, v) => $"{k}={v}").ToList(),
                Name = serverId.ToString(),
                Image = $"{template.ImageName}:{template.ImageTag}",
                HostConfig = new HostConfig()
                {
                    PortBindings = portBindings,
                    Mounts =
                        volumes
                            .Select(v => new Mount() { Type = "volume", Source = v.Value, Target = v.Key })
                            .ToList(),
                    RestartPolicy = new RestartPolicy() { MaximumRetryCount = 100, Name = RestartPolicyKind.Always }
                },
                ExposedPorts = exposedPorts,
            };

        var response = await client.Containers.CreateContainerAsync(containerOptions);
        await nmcDbContext.Servers.AddAsync(new Models.Database.Server()
        {
            CreationDateTime = DateTime.UtcNow,
            EnvironmentVariables = envs,
            ImageName = template.ImageName,
            ImageTag = template.ImageTag,
            Path = "",
            PortNumber = int.Parse(serverPort),
            ServerId = serverId,
            ServerName = serverName,
            ThumbnailPath = template.Thumbnail,
            Volumes = volumes
        });
        await nmcDbContext.SaveChangesAsync();
        return Created();
    }
}