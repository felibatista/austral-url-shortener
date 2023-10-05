using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
public class XYZController : ControllerBase
{
    private readonly IXYZRepository _context;

    public XYZController(IXYZRepository context)
    {
        _context = context;
    }

    [Microsoft.AspNetCore.Mvc.Route("all")]
    [Microsoft.AspNetCore.Mvc.HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetAll());
    }
    
    [Microsoft.AspNetCore.Mvc.Route("getLong")]
    [Microsoft.AspNetCore.Mvc.HttpGet]
    public IActionResult getUrlLongByShort([FromUri] string urlShort = null)
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
    
    [Microsoft.AspNetCore.Mvc.Route("create")]
    [Microsoft.AspNetCore.Mvc.HttpPost]
    public IActionResult createUrl([Microsoft.AspNetCore.Mvc.FromBody] XYZForCreationDto creationDto)
    {
       
        if (!Uri.IsWellFormedUriString(creationDto.UrlLong, UriKind.Absolute))
        {
            return BadRequest("Url long is not valid");
        }

        var url = _context.createUrl(creationDto);
        
        return Ok(url);
    }
    
}