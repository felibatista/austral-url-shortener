using SQLite;
using SQLiteNetExtensions.Attributes;

namespace url_shortener.Entities;

public class XYZ
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public string UrlShort { get; set; }
    public string UrlLong { get; set; }
    public int Clicks { get; set; }
    public int UserId { get; set;}
    public User User { get; set; } = null!;
    
    [OneToMany(CascadeOperations = CascadeOperation.All)]
    public List <Category> Categories { get; set; }
}
