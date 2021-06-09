using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Extensions;
using Shop.API.Helpers;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PartyController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly ILedgerRepository _ledgerRepo;
        public PartyController(IShopRepository repo, IMapper mapper, ILedgerRepository ledgerRepo)
        {
            _ledgerRepo = ledgerRepo;
            _mapper = mapper;
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetParties()
        {
            var partiesFromRepo = await _repo.GetParties();
            return Ok(partiesFromRepo);
        }

        [HttpGet("find/{search}")]
        public async Task<IActionResult> GetSearchParty(string search)
        {
            var partiesFromRepo = await _repo.GetSearchParty(search);
            return Ok(partiesFromRepo);
        }

        [HttpGet("findFromSP/{search}")]
        public async Task<IActionResult> GetSearchPartyFromSP(string search)
        {
            var partiesFromRepo = await _repo.GetPartyListViewModels(search, 1);
            return Ok(partiesFromRepo);
        }


        [HttpGet("gstinvalidate/{number}")]
        public async Task<IActionResult> gstinvalidate(string number)
        {
            var partiesFromRepo = GSTINValidator.IsValid(number);
            if (string.IsNullOrEmpty(number))
                return Ok(false);

            if (GSTINValidator.IsValid(number))
                return Ok(true);

            return Ok(false);
        }


        [HttpGet("GetParty/{id}")]
        public async Task<IActionResult> GetParty(int id)
        {
            var messageFromRepo = await _repo.GetParty(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateParty(PartyForCreateDto partyForCreateDto)
        {
            partyForCreateDto.Created = DateTime.Now;
            if (partyForCreateDto.GSTIN != null && partyForCreateDto.GSTIN != "")
            {
                if (!GSTINValidator.IsValid(partyForCreateDto.GSTIN))
                    return BadRequest("GSTIN Number is not valid.");
            }


            // partyForCreateDto.BranchId = User.GetBranchId();
            var party = _mapper.Map<Party>(partyForCreateDto);
            party.IsBillingEnabled = true;
            party.IsBlocked = false;
            _repo.Add(party);

            if (await _repo.SaveAll())
                return Ok(partyForCreateDto);

            return BadRequest();
        }

        [HttpPut("updatestatus/{id}")]
        public async Task<IActionResult> Updatestatus(int id, UpdatePartyStatusDto model)
        {
            model.BillingActionDate = DateTime.Now;
            var typesFromRepo = await _repo.GetParty(id);
            _mapper.Map(model, typesFromRepo);
            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Something wrong contact admin.");
        }


        [HttpPut("UpdateParty/{id}")]
        public async Task<IActionResult> UpdateParty(int id, PartyForCreateDto partyForCreateDto)
        {
            var typesFromRepo = await _repo.GetParty(id);
            _mapper.Map(partyForCreateDto, typesFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            throw new Exception($"Updating Party Type {id} failed on save");
        }

        [HttpDelete("DeleteParty/{id}")]
        public async Task<IActionResult> DeleteParty(int id)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var typeFromRepo = await _repo.GetParty(id);

            _repo.Delete(typeFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete Party Type");
        }

        [HttpGet("GetPartyTypes")]
        public async Task<IActionResult> GetPartyTypes()
        {
            var partiesFromRepo = await _repo.GetPartyTypes();
            return Ok(partiesFromRepo);
        }

        [HttpGet("{id}", Name = "GetPartyType")]
        public async Task<IActionResult> GetPartyType(int userId, int id)
        {
            var messageFromRepo = await _repo.GetPartyType(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost("CreatePartyType")]
        public async Task<IActionResult> CreatePartyType(PartyTypeForCreateDto partyTypeForCreateDto)
        {
            partyTypeForCreateDto.Created = DateTime.Now;


            var partytype = _mapper.Map<PartyType>(partyTypeForCreateDto);

            _repo.Add(partytype);

            if (await _repo.SaveAll())
                return Ok();

            throw new Exception("Creating the Party Type failed to save");
        }

        [HttpPut("UpdatePartyType/{id}")]
        public async Task<IActionResult> UpdatePartyType(int id, PartyTypeForUpdateDto partyTypeForUpdateDto)
        {
            var typesFromRepo = await _repo.GetPartyType(id);
            _mapper.Map(partyTypeForUpdateDto, typesFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating Party Type {id} failed on save");
        }

        [HttpDelete("DeletePartyType/{id}")]
        public async Task<IActionResult> DeletePartyType(int id)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var typeFromRepo = await _repo.GetPartyType(id);

            _repo.Delete(typeFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete Party Type");
        }

        //ledger reporting
        [HttpGet("LedgerByPartyId")]
        public async Task<IActionResult> GetPartyLedger([FromQuery] PartyLedgerParams ledgerParams)
        {
            var partiesFromRepo = await _ledgerRepo.GetPartyLedgerViewModel(ledgerParams);
            return Ok(partiesFromRepo);
        }
    }
}