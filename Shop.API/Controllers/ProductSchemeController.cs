using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Helpers;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductSchemeController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly IProductRepository _prod;
        public ProductSchemeController(IShopRepository repo, IMapper mapper, IProductRepository prod)
        {
            _mapper = mapper;
            _repo = repo;
            _prod = prod;
        }


        [HttpGet]
        public async Task<IActionResult> GetSchemes()
        {
            var data = await _prod.GetSaleSchemes();
            return Ok(data);
        }

        [HttpGet("GetScheme/{id}")]
        public async Task<IActionResult> GetSchemesByProductId(int id)
        {
            var data = await _prod.GetSaleScheme(id);
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SaleSchemeForCreateDto model)
        {
            var mappedData = _mapper.Map<SaleScheme>(model);
            mappedData.IsActive = true;
            mappedData.Created = DateTime.Now;
            _repo.Add(mappedData);

            if (await _repo.SaveAll())
                return Ok(mappedData);

            return BadRequest("Could not add the scheme.");
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, SaleSchemeForUpdateDto schemeForUpdateDto)
        {
            var scheme = await _prod.GetSaleSchemeById(id);
            if (scheme == null)
                return BadRequest("Scame not exists");

            _mapper.Map(schemeForUpdateDto, scheme);

            if (await _repo.SaveAll())
                return Ok(new
                {
                    id = id
                });

            return BadRequest("Updating board {id} failed on save");
        }

    }
}