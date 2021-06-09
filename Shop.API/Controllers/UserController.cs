using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Models;

namespace Shop.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IShopRepository _repo;
        private readonly IAuthRepository _authRepo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public UserController(IShopRepository repo, IMapper mapper, UserManager<User> userManager,
        IAuthRepository authRepo)
        {
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;
            _authRepo = authRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            // var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateUser(int userId, UserForRegisterDto userForRegisterDto)
        {

            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            if (userId == 0)
                return Unauthorized();
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _authRepo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");


            var userToCreate = new User
            {
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                UserName = userForRegisterDto.Username,
                Created = DateTime.Now,
                Email = "sandipkordiya@gmail.com",
                EmailConfirmed = true,
                BranchId = userForRegisterDto.BranchId
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
            var result2 = await _userManager.AddToRoleAsync(userToCreate, "USER");
            return Ok(result);
        }
    }
}