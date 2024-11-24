using System.Text.Json.Serialization;

namespace NMC.Models.Dto;

public class CreateServerDto
{
    [JsonPropertyName("variables")]
    public Dictionary<string, string> Variables { get; set; }
    [JsonPropertyName("template_id")]
    public string TemplateId { get; set; }
}