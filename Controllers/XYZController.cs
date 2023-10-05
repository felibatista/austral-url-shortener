using Microsoft.AspNetCore.Mvc;

namespace url_shortener.Controllers;

[ApiController]
[Route("[controller]")]
public class XYZController : ControllerBase
{
    private readonly ILogger<XYZController> _logger;

    public XYZController(ILogger<XYZController> logger)
    {
        _logger = logger;
    }

    //[HttpGet(Name = "GetWeatherForecast")]
}