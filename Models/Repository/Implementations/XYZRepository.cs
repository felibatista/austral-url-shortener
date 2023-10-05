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
    
    public XYZ? getUrlLongByShort(string urlShort)
    {
        using (var context = new UrlShortenerContext())
        {
            return context.Urls.FirstOrDefault(url => url.UrlShort == urlShort);
        }
    }
    
    public bool isUrlShortExist(string urlShort)
    {
        using (var context = new UrlShortenerContext())
        {
            return context.Urls.Any(url => url.UrlShort == urlShort);
        }
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
            UrlShort = randomUrl
        };

        using (var context = new UrlShortenerContext())
        {
            context.Urls.Add(url);
            context.SaveChanges();
            return url;
        }
    }

}