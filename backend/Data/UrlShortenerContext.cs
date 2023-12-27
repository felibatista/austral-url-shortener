using Microsoft.EntityFrameworkCore;
using url_shortener.Entities;

namespace url_shortener.Data;

public class UrlShortenerContext : DbContext
{
    public DbSet<XYZ> Urls { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Auth> Auth { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=urls.sqlite");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Auth>()
            .HasOne(e => e.User)
            .WithOne(e => e.Auth)
            .HasForeignKey<User>(e => e.AuthId);
        
        modelBuilder.Entity<User>() 
            .HasMany(e => e.Urls)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId);
        
        //seed data
        modelBuilder.Entity<Category>().HasData(
            new Category {Id = 1, Name = "Programming"},
            new Category {Id = 2, Name = "News"},
            new Category {Id = 3, Name = "Social Media"},
            new Category {Id = 4, Name = "Entertainment"},
            new Category {Id = 5, Name = "Other"}
        );
        
        modelBuilder.Entity<Auth>().HasData(
            new Auth {Id = 1, Password = "Admin12345@", Role = "Admin"}
        );
        
        modelBuilder.Entity<User>().HasData(
            new User {Id = 1, Username = "admin", FirstName = "Admin", LastName = "Admin", Email = "admin@admin.com", AuthId = 1});
        
    }
}