using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Interfaces;

namespace Shop.API.Controllers
{
    public class CityController : BaseApiController
    {
        private readonly ICityRepository _repo;
        private readonly IMapper _mapper;
        public CityController(ICityRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("AllCountries")]
        public async Task<IActionResult> GetCountries()
        {
            var data = await _repo.GetCountries();
            return Ok(data);
        }

        [HttpGet("AllStates/{countryId}")]
        public async Task<IActionResult> GetStates(int countryId)
        {
            var data = await _repo.GetStates(countryId);
            return Ok(data);
        }

        [HttpGet("AllCities/{stateId}")]
        public async Task<IActionResult> AllCities(int stateId)
        {
            var data = await _repo.GetCities(stateId);
            return Ok(data);
        }

    }
}