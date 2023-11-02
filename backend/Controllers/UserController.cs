using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using url_shortener.Entities;
using url_shortener.Models;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userContext;
    private readonly APIException _apiException;
    private readonly IAuthService _authService;
    
    public UserController(IUserService _userContext, APIException apiException, IAuthService authService)
    {
        this._userContext = _userContext;
        this._apiException = apiException;
        this._authService = authService;
    }
    
    [Route("all")]
    [Authorize(Roles = "admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_userContext.GetUsers());
    }
    
    [HttpGet("urls/{userId}")]
    public IActionResult getUrls(int userId)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }
        
        if (!_authService.isSameUserRequest(userId))
        {
            return Unauthorized("You are not allowed to get urls from another user");
        }
        
        try
        {
            var urls = _userContext.GetUrls(userId);
            return Ok(urls);
        } catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }


    [HttpGet("{userId}")]
    [Authorize(Roles = "admin")]
    public ActionResult<User> GetUser(int userId)
    {
        try
        {
            User? user = _userContext.GetUser(userId);
            return user;
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpPost]
    public ActionResult<User> PostUser(UserForCreationDTO userForCreationDto)
    {
        try
        {
            _userContext.AddUser(userForCreationDto);
            return Ok("User created successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }

    }
    
    [HttpPut]
    [Authorize(Roles = "admin")]
    public ActionResult<User> PutUser(UserForUpdateDTO userForUpdateDto)
    {
        try
        {
            _userContext.UpdateUser(userForUpdateDto);
            return Ok("User updated successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpDelete("{userId}")]
    [Authorize(Roles = "admin")]
    public ActionResult<User> DeleteUser(int userId)
    {
        try
        {
            _userContext.DeleteUser(userId);
            return Ok("User deleted successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}