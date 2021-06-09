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
    public class CompanyController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        public CompanyController(IShopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{branchId}")]
        public async Task<IActionResult> GetCompany(int branchId)
        {
            var messageFromRepo = await _repo.GetCompanybyBranchId(branchId);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CompanyForCreateDto companyForCreateDto)
        {
            companyForCreateDto.Created = DateTime.Now;
            var branch = _mapper.Map<Company>(companyForCreateDto);

            _repo.Add(branch);


            if (await _repo.SaveAll())
                return Ok(companyForCreateDto);

            return BadRequest("Could not add the Company.");
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, CompanyForUpdateDto companyForUpdateDto)
        {
            var companyFromRepo = await _repo.GetCompany(id);
            if (companyFromRepo == null)
                return BadRequest("Company not exists");

            _mapper.Map(companyForUpdateDto, companyFromRepo);

            if (await _repo.SaveAll())
                return Ok(new
                {
                    id = id
                });

            throw new Exception($"Updating board {id} failed on save");
        }

    }
}