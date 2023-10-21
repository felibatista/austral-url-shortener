using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Route("api/[controller]")]
public class XYZController : ControllerBase
{
    private readonly IXYZRepository _xyzContext;
    private readonly ICategoryRepository _categoryContext;

    public XYZController(IXYZRepository xyzContext, ICategoryRepository categoryContext)
    {
        _xyzContext = xyzContext;
        _categoryContext = categoryContext;
    }

    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_xyzContext.GetAll());
    }

    [Route("getLong")]
    [HttpGet]
    public IActionResult GetUrlLongByShort(string urlShort = null)
    {
        if (string.IsNullOrWhiteSpace(urlShort))
        {
            return BadRequest("Url short is required");
        }

        var urlLongByShort = _xyzContext.getUrlLongByShort(urlShort);

        if (urlLongByShort == null)
        {
            return NotFound();
        }

        return Ok(urlLongByShort);
    }

    [Route("create")]
    [HttpPost]
    public IActionResult CreateUrl([FromBody] XYZForCreationDto creationDto)
    {
        if (!Uri.IsWellFormedUriString(creationDto.UrlLong, UriKind.Absolute))
        {
            return BadRequest("Url long is not valid");
        }

        if (_categoryContext.getByName(creationDto.CategoryName) == null)
        {
            return BadRequest("Category name is not valid");
        }
        
        if (_xyzContext.isUrlLongExist(creationDto.UrlLong))
        {
            return BadRequest("Url long is already exist");
        }

        var url = _xyzContext.createUrl(creationDto);

        return Ok(url);
    }
    
    [Route("deleteById")]
    [HttpDelete]
    public IActionResult DeleteUrl(int id)
    {
        _xyzContext.deleteUrl(id);
        return Ok();
    }
    
    [Route("deleteByShort")]
    [HttpDelete]
    public IActionResult DeleteUrl(string urlShort)
    {
        _xyzContext.deleteUrl(urlShort);
        return Ok();
    }
}