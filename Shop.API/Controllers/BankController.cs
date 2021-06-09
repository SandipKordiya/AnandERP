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
    public class BankController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        public BankController(IShopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetBanks()
        {
            var branchesFromRepo = await _repo.GetBanks();
            return Ok(branchesFromRepo);
        }


        [HttpGet("GetBank")]
        public async Task<IActionResult> GetBank(int id)
        {
            var messageFromRepo = await _repo.GetBank(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> Create(BankForCreateDto bankForCreateDto)
        {
            var branch = _mapper.Map<Bank>(bankForCreateDto);
            branch.Created = DateTime.Now;
            _repo.Add(branch);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Could not add the Bank.");
        }


        [HttpPut]
        public async Task<IActionResult> Update(int id, BankForCreateDto bankForCreateDto)
        {
            var bankFromRepo = await _repo.GetBank(id);
            bankFromRepo.Updated = DateTime.Now;
            _mapper.Map(bankForCreateDto, bankFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Could not updated bank");
        }

    }
}