using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NMC.Caches;
using NMC.Models.Dto;

namespace NMC.Controllers;

[Authorize]
[Route("templates")]
public class TemplatesController(ITemplateCache templateCache): ControllerBase
{
    public GetAllTemplatesDto GetAll()
    {
        var templates =
            templateCache
                .GetAll()
                .Values
                .Select(
                    template =>
                        new GetAllTemplatesDtoEntry()
                        {
                            Id = template.Id,
                            TemplateName = template.TemplateName,
                            ThumbnailUrl = template.ThumbnailUrl
                        }
                    );

        return new GetAllTemplatesDto { Entries = templates };
    }

    [Route("{templateId}/details")]
    public async Task<GetTemplateDetailsDto> GetTemplateDetails(string templateId)
    {
        var template = await templateCache.GetTemplate(templateId);
        return new GetTemplateDetailsDto() { Variables = template.Variables, EulaNeeded = template.EulaNeeded };
    }
}