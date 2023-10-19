using Microsoft.AspNetCore.Mvc;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _context;
    
    public CategoryController(ICategoryRepository context)
    {
        _context = context;
    }
    
    [Route("all")]
    [HttpGet]
    public IActionResult getAll()
    {
        return Ok(_context.getAll());
    }
    
    [Route("getById")]
    [HttpGet]
    public IActionResult getById(int id)
    {
        var category = _context.getById(id);
        
        if (category == null)
        {
            return NotFound();
        }
        
        return Ok(category);
    }
    
    [Route("getByName")]
    [HttpGet]
    public IActionResult getByName(string name)
    {
        var category = _context.getByName(name);
        
        if (category == null)
        {
            return NotFound();
        }
        
        return Ok(category);
    }
    
    [Route("create")]
    [HttpPost]
    public IActionResult createCategory(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Name is required");
        }
        
        if (_context.getByName(name) != null)
        {
            return BadRequest("Name is already exist");
        }
        
        _context.createCategory(name);
        
        return Ok("Category " + name +" created");
    }
    
    [Route("update")]
    [HttpPut]
    public IActionResult updateCategory(int id, string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return BadRequest("Name is required");
        }
        
        if (_context.getById(id) == null)
        {
            return NotFound();
        }
        
        _context.updateCategory(id, name);
        
        return Ok("Category " + name +" updated");
    }

    [Route("delete")]
    [HttpDelete]
    public IActionResult deleteCategory(int id)
    {
        if (_context.getById(id) == null)
        {
            return NotFound();
        }

        _context.deleteCategory(id);

        return Ok("Category deleted");
    }
}