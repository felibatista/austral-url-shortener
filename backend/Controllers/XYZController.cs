using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using url_shortener.Models;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Route("api/[controller]")]
public class XYZController : ControllerBase
{
    private readonly IXYZService _xyzContext;
    private readonly APIException _apiException;
    private readonly IAuthService _authService;

    public XYZController(IXYZService xyzContext, APIException apiException, IAuthService authService)
    {
        _xyzContext = xyzContext;
        _apiException = apiException;
        _authService = authService;
    }

    [Route("all")]
    [Authorize(Roles = "admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_xyzContext.GetAll());
    }

    [Route("getLong")]
    [HttpGet]
    public IActionResult GetUrlLongByShort(string urlShort)
    {
        try
        {
            var urlLongByShort = _xyzContext.getUrlLongByShort(urlShort);
        
            return Ok(urlLongByShort);            
        } 
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [Route("getById")]
    [HttpGet]
    public IActionResult GetById(int id)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }
        
        if (!_authService.isSameUserRequest(_xyzContext.getById(id).UserId))
        {
            return Unauthorized("You are not allowed to get a url for another user");
        }
        
        try
        {
            var url = _xyzContext.getById(id);
        
            return Ok(url);            
        } 
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [Route("create")]
    [HttpPost]
    public IActionResult CreateUrl(XYZForCreationDto creationDto)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }
        
        if (!_authService.isSameUserRequest(creationDto.UserId))
        {
            return Unauthorized("You are not allowed to create a url for another user");
        }
        
        try
        {
            var url = _xyzContext.createUrl(creationDto);

            return Ok(url);   
        } 
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [Route("deleteById")]
    [HttpDelete]
    public IActionResult DeleteUrl(int id)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }
        
        if (!_authService.isSameUserRequest(_xyzContext.getById(id).UserId))
        {
            return Unauthorized("You are not allowed to delete a url for another user");
        }
        
        try
        {
            _xyzContext.deleteUrl(id);
            return Ok("Url " + id + " deleted");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [Route("deleteByShort")]
    [HttpDelete]
    public IActionResult DeleteUrl(string urlShort)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }
        
        if (!_authService.isSameUserRequest(_xyzContext.getUrlLongByShort(urlShort).UserId))
        {
            return Unauthorized("You are not allowed to delete a url for another user");
        }
        
        try
        {
            _xyzContext.deleteUrl(urlShort);
            return Ok("Url " + urlShort + " deleted");   
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}