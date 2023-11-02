using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using url_shortener.Data;
using url_shortener.Entities;
using url_shortener.Models.Repository.Interface;

namespace url_shortener.Models.Repository.Implementations;

public class AuthRepository : IAuthRepository
{
    private readonly UrlShortenerContext _context;
    private readonly IConfiguration _config;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthRepository(UrlShortenerContext context, IConfiguration config, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _config = config;
        _httpContextAccessor = httpContextAccessor;
    }

    public User Authenticate(UserForLoginDTO userForLoginDto)
    {
        var user = _context.Users.FirstOrDefault(x => x.Username.ToLower() == userForLoginDto.Username.ToLower() && x.Password == userForLoginDto.Password);
       
        if (user != null)
        {
            return user;
        }

        return null;
    }

    public string GenerateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
            new Claim(ClaimTypes.Role,user.Role)
        };
        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);
        
        return new JwtSecurityTokenHandler().WriteToken(token);    
    }
    
    public User getCurrentUser()
    {
        var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            return new User
            {
                Id = int.Parse(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value),
                Role = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value
            };
        }
        return null;
    }

    public bool isSameUserRequest(int userId)
    {
        var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            
            if (userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value.ToLower() == "admin")
            {
                return true;
            }
            
            if (userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value != null)

            return int.Parse(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value) == userId;
        }
        return false;
    }

    public void CreateUser(User user)
    {
        throw new NotImplementedException();
    }
}