namespace NMC.Models.Dto;

public class SystemInfo
{
    public required string MachineName { get; set; }
    
    public required string CpuLoad { get; set; }

    public bool DockerIsRunning { get; set; }
}