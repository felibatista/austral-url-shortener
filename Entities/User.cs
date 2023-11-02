using SQLiteNetExtensions.Attributes;

namespace url_shortener.Entities;

public class User{ 
        public int Id {get; set;} 
        public String Username {get; set;}
        public String Password {get; set;} 
        public String Role { get; set; }
        [OneToMany(CascadeOperations = CascadeOperation.All)]
        public List<XYZ> Urls { get; set; }
}