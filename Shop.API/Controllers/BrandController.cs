using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Models;

namespace Shop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        public BrandController(IShopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetBrands()
        {
            var branchesFromRepo = await _repo.GetBrands();
            return Ok(branchesFromRepo);
        }


        [HttpGet("{id}", Name = "GetBrand")]
        public async Task<IActionResult> GetBrand(int userId, int id)
        {
            var messageFromRepo = await _repo.GetBrand(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBrand(BrandForCreateDto brandForCreateDto)
        {

            brandForCreateDto.Created = DateTime.Now;
            var branch = _mapper.Map<Brand>(brandForCreateDto);

            _repo.Add(branch);


            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Could not add the brand.");
        }

    }
}