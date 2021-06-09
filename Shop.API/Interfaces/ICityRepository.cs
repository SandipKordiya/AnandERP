using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Models;

namespace Shop.API.Interfaces
{
    public interface ICityRepository
    {
        Task<List<Country>> GetCountries();
        Task<List<State>> GetStates(int countryId);
        Task<List<City>> GetCities(int stateId);
    }
}