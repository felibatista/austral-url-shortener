using Microsoft.EntityFrameworkCore;
using url_shortener.Data;
using url_shortener.Entities;
using url_shortener.Models.Repository.Interface;
using url_shortener.Util;

namespace url_shortener.Models.Repository.Implementations;

public class XYZRepository : IXYZRepository
{
    private readonly UrlShortenerContext _context;

    public XYZRepository(UrlShortenerContext context)
    {
        _context = context;
    }
    public List<XYZ> GetAll()
    {
        return _context.Urls.ToList();
    }
    
    public XYZ getById(int id)
    {
        return _context.Urls.FirstOrDefault(url => url.Id == id);
    }
    
    public XYZ? getUrlLongByShort(string urlShort)
    {
        return _context.Urls.FirstOrDefault(url => url.UrlShort == urlShort);
    }
    
    public bool isUrlShortExist(string urlShort)
    {
        return _context.Urls.Any(url => url.UrlShort == urlShort);
    }
    
    public bool isUrlLongExist(string urlLong)
    {
        return _context.Urls.Any(url => url.UrlLong == urlLong);
    }
    
    public XYZ createUrl(XYZForCreationDto creationDto)
    {
        string randomUrl = urlGenerator.RandomString(6);
        
        while (isUrlShortExist(randomUrl))
        {
            randomUrl = urlGenerator.RandomString(6);
        }
        
        var url = new XYZ
        {
            Name = creationDto.Name,
            UrlLong = creationDto.UrlLong,
            UrlShort = randomUrl,
            CategoryId = _context.Categories.FirstOrDefault(category => category.Name == creationDto.CategoryName.ToLower())?.Id ?? -1,
        };
        
        _context.Urls.Add(url); 
        _context.SaveChanges();
        return url;
    }
    
    public  void addClick(int id)
    {
        XYZ? urlToChange =  _context.Urls.FirstOrDefault(url => url.Id == id);

        if (urlToChange != null)
        {
            urlToChange.Clicks++;
        }

        _context.SaveChanges();
    }

    public void deleteUrl(int id)
    {
        
    }

    public void deleteUrl(string urlShort)
    {
        throw new NotImplementedException();
    }
}