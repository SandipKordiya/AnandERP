using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Data;
using Shop.API.Interfaces;
using Shop.API.Models;

namespace Shop.API.Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext _context;
        public CityRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<City>> GetCities(int stateId)
        {
           return await _context.Cities.Where(m => m.StateId == stateId)
           .ToListAsync();
        }

        public async Task<List<Country>> GetCountries()
        {
           return await _context.Countries.Where(m => m.Name == "India")
           .ToListAsync();
        }

        public async Task<List<State>> GetStates(int countryId)
        {
           return await _context.States.Where(m => m.CountryId == countryId)
           .ToListAsync();
        }
    }
}