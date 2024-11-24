using System.Text.Json.Serialization;

namespace NMC.Models.Template;

public class Template
{
    [JsonPropertyName("template_name")]
    public string TemplateName { get; set; }
    [JsonPropertyName("image_name")]
    public string ImageName { get; set; }
    [JsonPropertyName("image_tag")]
    public string ImageTag { get; set; }
    [JsonPropertyName("thumbnail_url")]
    public string Thumbnail { get; set; }
    [JsonPropertyName("eula_needed")]
    public bool EulaNeeded { get; set; }
    [JsonPropertyName("guest_volumes")]
    public string[] GuestVolumes { get; set; }
    [JsonPropertyName("variables")]
    public Variables[] Variables { get; set; }
    [JsonPropertyName("env")]
    public Dictionary<string,string> Env { get; set; }
}