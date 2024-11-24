using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace NMC.Models.Template;

public class ManifestEntry
{
    [JsonPropertyName("template_id")]
    public string Id { get; set; }
    [JsonPropertyName("template_name")]
    public string TemplateName { get; set; }
    [JsonPropertyName("thumbnail_url")]
    public string ThumbnailUrl { get; set; }
    [JsonPropertyName("template_url")]
    public string TemplateUrl { get; set; }
}