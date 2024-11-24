using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace NMC.Models.Template;

public class Variables
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("type")]
    public string Type { get; set; }
    [JsonPropertyName("description")]
    public string Description { get; set; }
    [JsonPropertyName("acceptable_answers")]
    public string[] AcceptableAnswers { get; set; }
}