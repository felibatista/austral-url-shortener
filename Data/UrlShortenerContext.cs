using System.Configuration;
using Microsoft.EntityFrameworkCore;
using url_shortener.Entities;

namespace url_shortener.Data;

public class UrlShortenerContext : DbContext
{
    public DbSet<XYZ> Urls { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=identifier.sqlite");
    }
    
}