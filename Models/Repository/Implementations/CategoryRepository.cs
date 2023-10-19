using url_shortener.Data;
using url_shortener.Entities;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Models.Repository.Implementations;

public class CategoryRepository : ICategoryRepository
{
    private readonly UrlShortenerContext _context;
    
    public CategoryRepository(UrlShortenerContext context)
    {
        _context = context;
    }
    
    public List<Category> getAll()
    {
        return _context.Categories.ToList();
    }

    public Category? getById(int id)
    {
        return _context.Categories.FirstOrDefault((category) => category.Id == id);
    }
    
    public Category? getByName(string name)
    {
        return _context.Categories.FirstOrDefault((category) => category.Name.ToLower() == name.ToLower());
    }

    public void createCategory(string name)
    {
        var category = new Category
        {
            Name = name.ToLower()
        };
        
        _context.Categories.Add(category);
        _context.SaveChanges();
    }

    public void updateCategory(int id, string name)
    {
        var category = getById(id);
        
        if (category != null)
        {
            category.Name = name.ToLower();
            _context.SaveChanges();
        }
    }

    public void deleteCategory(int id)
    {
        throw new NotImplementedException();
    }
}