using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NMC.Models.Dto;
using Docker.DotNet;

namespace NMC.Controllers;

[Authorize]
[Route("system")]
public class SystemController: ControllerBase
{
    [HttpGet("info")]
    public async Task<ActionResult<SystemInfo>> GetInfo()
    {
        var load = await System.Diagnostics.RuntimeStats.GetCpuLoadAveragesAsync();
        bool dockerState = false;
        try
        {
            using var client = new DockerClientConfiguration().CreateClient();
            var dockerInfo = await client.System.GetSystemInfoAsync();
            dockerState = true;
        }
        catch
        {
            // ignored
        }

        return new SystemInfo
        {
            MachineName = Environment.MachineName,
            CpuLoad = $"{load.OneMinute}, {load.FiveMinutes}, {load.FifteenMinutes}",
            DockerIsRunning = dockerState
        };
    }
}