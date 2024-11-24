using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace NMC.Models.Dto;

public class GetAllTemplatesDto
{
    [JsonPropertyName("entries")]
    public IEnumerable<GetAllTemplatesDtoEntry> Entries { get; set; }
}

public class GetAllTemplatesDtoEntry
{
    [JsonPropertyName("template_id")]
    public string Id { get; set; }
    [JsonPropertyName("template_name")]
    public string TemplateName { get; set; }
    [JsonPropertyName("thumbnail_url")]
    public string ThumbnailUrl { get; set; }
}