using Api.Helper;
using EmployeeManagementSystemApi;
using EmployeeManagementUsingEntityFramework;
using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly PasswordHasherService _passwordHasherService;
        public AuthController(EmployeeDbContext context, PasswordHasherService passwordHasherService)
        {
            _context = context;
            _passwordHasherService = passwordHasherService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null) { return BadRequest(); }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found" });
            }
            string storedHashedPassword = GetStoredHashedPassword(userObj.Email);
            bool isPasswordValid = _passwordHasherService.VerifyPassword(storedHashedPassword, userObj.Password);
            if (!isPasswordValid)
            {
                return Unauthorized(new { Message = "Invalid Credentials" });
            }
            user.Token = CreateJwt(user);
            return Ok(new {
                Token = user.Token,
                Message = "Login Success",
                Image=user.Image
            }
                            );
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register(User userObj)
        {
            if (userObj == null) { return BadRequest(); }
            //checking Email is Unique
            if (await CheckEmailExists(userObj.Email)) {
                return BadRequest(new { Message = "Email Already Exsits" });
            }
            if (await CheckUsernameExists(userObj.Username))
            {
                return BadRequest(new { Message = "Username Already Exsits" });
            }

            var hashedPassword = _passwordHasherService.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Password = hashedPassword;
            await _context.Users.AddAsync(userObj);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Registerd Successfully" });

        }
        private string GetStoredHashedPassword(string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            return user.Password;
        }

        private async Task<bool> CheckEmailExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }
        private async Task<bool> CheckUsernameExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.Username == username);
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = System.Text.Encoding.ASCII.GetBytes("a1b2c3d4e5f67890123456789abcdef0");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.Username)

            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var jwt = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(jwt);


        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers() {
            return Ok(await _context.Users.ToListAsync());
        }



    }
}
