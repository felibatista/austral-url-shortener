using System.Net;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Microsoft.AspNetCore.Mvc.Route("{urlShort}")]
public class RedirectController : ControllerBase
{
    private readonly IXYZRepository _context;

    public RedirectController(IXYZRepository context)
    {
        _context = context;
    }
    
    [Microsoft.AspNetCore.Mvc.HttpGet]
    public IActionResult getRedirect([FromUri] string urlShort = null)
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

        return RedirectPermanent(urlLongByShort.UrlLong);
    }
}