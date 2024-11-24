using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;
using NMC.Models.Template;

namespace NMC.Caches;

public class TemplateCache(IConfiguration configuration, IMemoryCache memoryCache): ITemplateCache
{
    private Dictionary<string, ManifestEntry> _manifest;

    public Dictionary<string, ManifestEntry> GetAll()
    {
        return _manifest;
    }

    public async Task<Template> GetTemplate(string templateId)
    {
        var template = await memoryCache.GetOrCreateAsync($"Template::{templateId}", async entry =>
        {
            var httpClient = new HttpClient();
            var manifestUrl = _manifest[templateId];
            var manifestString = await httpClient.GetStringAsync(manifestUrl.TemplateUrl);
            var templateObj = JsonSerializer.Deserialize<Template>(manifestString) 
                              ?? throw new Exception("Deserialization failed");
            return templateObj;
        });

        if (template is null)
            throw new Exception("Should not happen?");

        return template;
    }
    
    public async Task Refresh()
    {
        var client = new HttpClient();
        var manifest = await client.GetStringAsync(configuration["ManifestUrl"]);
        var deserializedManifest = 
            JsonSerializer.Deserialize<ManifestEntry[]>(manifest) ??
            throw new Exception("Deserialization failed");
        _manifest = deserializedManifest.ToDictionary(m => m.Id, m => m);
    }
}

public interface ITemplateCache
{
    Task Refresh();
    Dictionary<string, ManifestEntry> GetAll();
    Task<Template> GetTemplate(string templateId);
}