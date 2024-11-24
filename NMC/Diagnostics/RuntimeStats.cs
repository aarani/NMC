// Copyright (c) Event Store Ltd and/or licensed to Event Store Ltd under one or more agreements.
// Event Store Ltd licenses this file to you under the Event Store License v2 (see LICENSE.md).

// ReSharper disable CheckNamespace

using System.Runtime.InteropServices;
using static System.Convert;
using static System.Globalization.CultureInfo;
namespace System.Diagnostics;

public static class RuntimeStats {
    public static ValueTask<(double OneMinute, double FiveMinutes, double FifteenMinutes)> GetCpuLoadAveragesAsync()
    {
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            return GetLoadAveragesLinux();
        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            return GetLoadAveragesMac();
        if (RuntimeInformation.IsOSPlatform(OSPlatform.FreeBSD))
            return GetLoadAveragesFreeBSD();
        
        return ValueTask.FromResult((0.0, 0.0, 0.0));

        static async ValueTask<(double OneMinute, double FiveMinutes, double FifteenMinutes)> GetLoadAveragesLinux() {
            // On Linux, the /proc/loadavg file provides load averages along with some additional scheduling information.
            // The file typically looks something like this:
            //
            // 0.01 0.05 0.05 1/789 12345
            //
            // Here:
            //
            // - 0.01 is the 1-minute load average.
            // - 0.05 is the 5-minute load average.
            // - 0.05 is the 15-minute load average.
            // - 1/789 indicates the number of currently running processes over the total number of processes.
            // - 12345 is the last process ID used.

            var output = await ExecuteShellCommandAsync("grep -Eo '^[^ ]+ [^ ]+ [^ ]+' /proc/loadavg");
            var values = output.Split(' ');

            return (
                OneMinute: ToDouble(values[0], InvariantCulture),
                FiveMinutes: ToDouble(values[1], InvariantCulture),
                FifteenMinutes: ToDouble(values[2], InvariantCulture)
            );
        }

        static async ValueTask<(double OneMinute, double FiveMinutes, double FifteenMinutes)> GetLoadAveragesMac() {
            // On macOS, the uptime command might give you something like this:
            //
            // 14:55  up 10 days,  4:02, 4 users, load averages: 2.43 2.72 2.89
            //
            // Here:
            //
            // - 2.43 is the 1-minute load average.
            // - 2.72 is the 5-minute load average.
            // - 2.89 is the 15-minute load average.

            var output = await ExecuteShellCommandAsync("uptime");
            var startIndex = output.LastIndexOf(':') + 1; // find the last colon and start right after it
            var loadAverages = output[startIndex..].Trim();
            var values = loadAverages.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            return (
                OneMinute: ToDouble(values[0], InvariantCulture),
                FiveMinutes: ToDouble(values[1], InvariantCulture),
                FifteenMinutes: ToDouble(values[2], InvariantCulture)
            );
        }

        static async ValueTask<(double OneMinute, double FiveMinutes, double FifteenMinutes)> GetLoadAveragesFreeBSD() {
            // works on macOS as well
            // Example output: "{ 0.12 0.26 0.21 }"
            var output = await ExecuteShellCommandAsync("sysctl -n vm.loadavg");
            var values = output.Trim('{', '}', ' ').Split(' ');

            return (
                OneMinute: ToDouble(values[0], InvariantCulture),
                FiveMinutes: ToDouble(values[1], InvariantCulture),
                FifteenMinutes: ToDouble(values[2], InvariantCulture)
            );
        }
    }

    static async ValueTask<string> ExecuteShellCommandAsync(string command) {
        var escapedArgs = command.Replace(@"\", @"\\");

        var psi = new ProcessStartInfo {
            FileName = "/bin/sh",
            Arguments = $"-c \"{escapedArgs}\"",
            RedirectStandardOutput = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };
    
        using var process = Process.Start(psi);
    
        if (process is null)
            throw new InvalidOperationException($"Could not start sh process to execute: {psi.FileName} {psi.Arguments}");
    
        var result = await process.StandardOutput.ReadToEndAsync();
    
        await process.WaitForExitAsync();
    
        return result.Trim();
    }
}