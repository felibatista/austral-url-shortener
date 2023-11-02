using url_shortener.Entities;

namespace url_shortener.Models.Repository.Interface;

public interface IAuthRepository
{
    public User Authenticate(UserForLoginDTO userForLoginDto);
    public string GenerateToken(User auth);
    public User getCurrentUser();
    public Boolean isSameUserRequest(int userId);
    public void CreateUser(User user);
}