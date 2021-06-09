using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shop.API.Data;
using Shop.API.Dtos;
using Shop.API.Models;

namespace Shop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IShopRepository _shoprepo;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthRepository repo, IShopRepository shoprepo,
         ITokenService tokenService,
         IConfiguration config, IMapper mapper,
        DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _shoprepo = shoprepo;
            _config = config;
            _repo = repo;
            _tokenService = tokenService;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                UserName = userForRegisterDto.Username,
                Created = DateTime.Now,
                BranchId = userForRegisterDto.BranchId
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            try
            {
                var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

                // var userFromRepo = await _userManager.FindByEmailAsync(userForLoginDto.Username.ToLower());

                if (userFromRepo == null)
                    return Unauthorized();

                // var result = await _signInManager.CheckPasswordSignInAsync(userFromRepo, userForLoginDto.Password, false);

                // if (!result.Succeeded) return Unauthorized();

                var user = _mapper.Map<UserForListDto>(userFromRepo);
                var userlist = await (from u in _context.Users.Where(u => u.Id == user.Id)
                                      select new
                                      {
                                          Roles = (from userRole in u.UserRoles
                                                   join role in _context.Roles
                                                   on userRole.RoleId
                                                   equals role.Id
                                                   select role.Name).ToList()
                                      }).FirstOrDefaultAsync();


                return Ok(new
                {
                    token = _tokenService.CreateToken(userFromRepo),
                    user,
                    userlist.Roles
                });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex);
            }
        }

        
    }
}