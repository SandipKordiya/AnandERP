using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.API.Dtos;
using Shop.API.Interfaces;
using Shop.API.Models;

namespace Shop.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        // private readonly IUnitOfWork _unitOfWork;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper)
        {
            // _unitOfWork = unitOfWork;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto loginDto)
        {
            try
            {
                var user = await _userManager.Users
                .Include(x => x.Branch)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

                if (user == null) return Unauthorized("Invalid username");

                var result = await _signInManager
                    .CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded) return Unauthorized();

                return Ok(new
                {
                    token = await _tokenService.CreateToken(user),
                    user
                });
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}