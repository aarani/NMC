using Docker.DotNet;

namespace NMC.Models.Dto;

public class Server
{
    public Guid ServerId { get; set; }
    public int PortNumber { get; set; }
    public string ServerName { get; set; }
    public string Thumbnail { get; set; }
    public DateTime CreationDateTime { get; set; }
    public string? Status { get; set; } = null;

    public static Server FromDatabase(Database.Server dbServer) =>
        new()
        {
            ServerId = dbServer.ServerId,
            ServerName = dbServer.ServerName,
            Thumbnail = dbServer.ThumbnailPath,
            CreationDateTime = dbServer.CreationDateTime,
            PortNumber = dbServer.PortNumber
        };
}