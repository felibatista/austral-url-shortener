using SQLiteNetExtensions.Attributes;

namespace url_shortener.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }

    [OneToMany (CascadeOperations = CascadeOperation.All)] 
    public List<XYZ> Urls { get; set; }
}