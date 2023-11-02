using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;
[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IAuthRepository _authRepository;

    public UserController(IConfiguration config, IAuthRepository authRepository)
    {
        _config = config;
        _authRepository = authRepository;
    }

    [AllowAnonymous]
    [HttpPost]
    public ActionResult Login(UserForLoginDTO userForLoginDto)
    {
        var user = _authRepository.Authenticate(userForLoginDto);
        
        if (user != null)
        {
            var token = _authRepository.GenerateToken(user);
            return Ok(token);
        }

        return NotFound("User not found");
    }
}