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
    public class TaxController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        public TaxController(IShopRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetTaxes()
        {
            var partiesFromRepo = await _repo.GetTaxes();
            return Ok(partiesFromRepo);
        }

        [HttpGet("{id}", Name = "GetTax")]
        public async Task<IActionResult> GetTax(int id)
        {
            var messageFromRepo = await _repo.GetTax(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }


        [HttpPost]
        public async Task<IActionResult> Create(TaxForCreateDto taxForCreateDto)
        {
            taxForCreateDto.Created = DateTime.Now;
            var party = _mapper.Map<Tax>(taxForCreateDto);

            _repo.Add(party);

            if (await _repo.SaveAll())
                return Ok();

            throw new Exception("Creating the message failed to save");
        }

    }
}