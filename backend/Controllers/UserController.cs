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
        try
        {
            if (_authService.getCurrentUser() == null)
            {
                return Unauthorized();
            }

            if (_authService.getCurrentUser().Id == userId || _authService.getCurrentUser().Role == "admin")
            {
                var urls = _userContext.GetUrls(userId);
                return Ok(urls);
            }
        
            return Unauthorized();
        } catch (Exception e)
        {
            if (e.Data == null)
            {
                return Unauthorized();
            }
            
            if (e.Data["type"] == null || e.Data["type"].ToString() == "NOT_FOUND")
            {
                return Unauthorized();
            }
            
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }


    [HttpGet("{userId}")]
    public ActionResult<User> GetUser(int userId)
    {
        try
        {
            if (_authService.getCurrentUser() == null)
            {
                return Unauthorized();
            }
            
            if (_authService.getCurrentUser().Id == userId || _authService.getCurrentUser().Role == "admin")
            {
                return Ok(_userContext.GetUser(userId));
            }

            return Unauthorized();
        }
        catch (Exception e)
        {
            if (e.Data == null)
            {
                return Unauthorized();
            }
            
            if (e.Data["type"] == null || e.Data["type"].ToString() == "NOT_FOUND")
            {
                return Unauthorized();
            }
            
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