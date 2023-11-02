using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;
[ApiController]
[Route("/api/[controller]")]
public class AuthenticateController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IAuthService _authService;

    public AuthenticateController(IConfiguration config, IAuthService authService)
    {
        _config = config;
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost]
    public ActionResult Login(UserForLoginDTO userForLoginDto)
    {
        var user = _authService.Authenticate(userForLoginDto);
        
        if (user != null)
        {
            var token = _authService.GenerateToken(user);
            return Ok(token);
        }

        return NotFound("User not found");
    }
}