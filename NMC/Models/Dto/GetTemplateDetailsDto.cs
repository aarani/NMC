using System.Text.Json.Serialization;
using NMC.Models.Template;

namespace NMC.Models.Dto;

public class GetTemplateDetailsDto
{
    [JsonPropertyName("variables")]
    public IReadOnlyCollection<Variables> Variables { get; set; }
    [JsonPropertyName("eula_needed")]
    public bool EulaNeeded { get; set; }
}