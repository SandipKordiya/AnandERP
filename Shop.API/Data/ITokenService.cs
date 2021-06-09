using Shop.API.Models;

namespace Shop.API.Data
{
    public interface ITokenService
    {
          string CreateToken(User user);
    }
}