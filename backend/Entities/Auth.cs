using SQLite;
using SQLiteNetExtensions.Attributes;

namespace url_shortener.Entities;

public class Auth{
    [PrimaryKey]
    public int Id {get; set;}
    public String Password {get; set;} 
    public String Role { get; set; }
    public User User { get; set; } = null!;
}