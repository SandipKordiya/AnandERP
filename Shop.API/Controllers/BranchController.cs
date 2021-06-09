using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Helpers;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IAuthRepository _auth;
        private readonly ILedgerRepository _ledgerRepo;
        public BranchController(IShopRepository repo, IMapper mapper, IAuthRepository auth, ILedgerRepository ledgerRepo,
         UserManager<User> userManager)
        {
            _ledgerRepo = ledgerRepo;
            _userManager = userManager;
            _auth = auth;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var branchesFromRepo = await _repo.GetBranches();
            return Ok(branchesFromRepo);
        }

        [HttpGet("GetBranchPaging/{pageNo}/{pageSize}")]
        public async Task<IActionResult> GetBranchPaging(int pageNo, int pageSize)
        {
            var branchesFromRepo = await _repo.GetBranchesByPaging(pageNo, pageSize);
            return Ok(branchesFromRepo);
        }


        [HttpGet("{id}", Name = "GetBranch")]
        public async Task<IActionResult> GetBranch(int userId, int id)
        {
            var messageFromRepo = await _repo.GetBranch(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateBranch(int userId, BranchForCreateDto branchForCreateDto)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            branchForCreateDto.Created = DateTime.Now;
            var branch = _mapper.Map<Branch>(branchForCreateDto);

            _repo.Add(branch);


            if (await _repo.SaveAll())
            {

                var userToCreate = new User
                {
                    FirstName = branch.Name + ' ' + "Admin",
                    LastName = "",
                    UserName = branch.Name + "Admin",
                    Created = DateTime.Now,
                    BranchId = branch.Id,
                    Email = "sandipkordiya@gmail.com",
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(userToCreate, "Pa$$w0rd");
                if (!result.Succeeded)
                {
                    var errors = "";
                    foreach (var error in result.Errors)
                    {
                        errors = error.Description;
                    }
                    return BadRequest(errors);
                }
                var result2 = await _userManager.AddToRoleAsync(userToCreate, "ADMIN");
                return Ok();

            }

            return BadRequest("Could not add the branch.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BranchForUpdateDto branchForUpdateDto)
        {
            var branchFromRepo = await _repo.GetBranch(id);
            _mapper.Map(branchForUpdateDto, branchFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating branch {id} failed on save");
        }


        //reporting
        [HttpGet("GetBranchInventory")]
        public async Task<IActionResult> GetBranchInventory([FromQuery] BranchProductDetailParams branchProductDetailParams)
        {
            var messageFromRepo = await _ledgerRepo.GetBranchInventoryModels(branchProductDetailParams);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

    }
}