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
    public class CategoryController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        public CategoryController(IShopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var branchesFromRepo = await _repo.GetCategories();
            return Ok(branchesFromRepo);
        }


        [HttpGet("{id}", Name = "GetCategory")]
        public async Task<IActionResult> GetCategory(int userId, int id)
        {
            var messageFromRepo = await _repo.GetCategory(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBrand(CategoryForCreateDto categoryForCreateDto)
        {

            categoryForCreateDto.Created = DateTime.Now;
            var branch = _mapper.Map<Category>(categoryForCreateDto);

            _repo.Add(branch);


            if (await _repo.SaveAll())
                return Ok();

            throw new Exception("Creating the message failed to save");
        }
    }
}