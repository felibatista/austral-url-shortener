using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Route("api/[controller]")]
public class XYZController : ControllerBase
{
    private readonly IXYZRepository _context;

    public XYZController(IXYZRepository context)
    {
        _context = context;
    }

    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetAll());
    }

    [Route("getLong")]
    [HttpGet]
    public IActionResult getUrlLongByShort(string urlShort = null)
    {
        if (string.IsNullOrWhiteSpace(urlShort))
        {
            return BadRequest("Url short is required");
        }

        var urlLongByShort = _context.getUrlLongByShort(urlShort);

        if (urlLongByShort == null)
        {
            return NotFound();
        }

        return Ok(urlLongByShort);
    }

    [Route("create")]
    [HttpPost]
    public IActionResult createUrl([FromBody] XYZForCreationDto creationDto)
    {
        if (!Uri.IsWellFormedUriString(creationDto.UrlLong, UriKind.Absolute))
        {
            return BadRequest("Url long is not valid");
        }

        var url = _context.createUrl(creationDto);

        return Ok(url);
    }
}