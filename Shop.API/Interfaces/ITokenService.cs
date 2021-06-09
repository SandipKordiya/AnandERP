using System.Threading.Tasks;
using Shop.API.Models;

namespace Shop.API.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}