namespace NMC.Models.Database;

public class Server
{
    public Guid ServerId { get; set; }
    public int PortNumber { get; set; }
    public string ServerName { get; set; } = null!;
    public string ImageName { get; set; } = null!;
    public string ImageTag { get; set; } = null!;
    public Dictionary<string, string> EnvironmentVariables { get; set; } = new();
    public Dictionary<string, string> Volumes { get; set; } = new();

    public string Path { get; set; } = null!;
    public string ThumbnailPath { get; set; } = null!;
    public DateTime CreationDateTime { get; set; }
}