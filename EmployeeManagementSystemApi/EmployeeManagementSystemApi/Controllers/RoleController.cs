using EmployeeManagementSystemApi;
using EmployeeManagementSystemApi.Models.Dtos_s;
using EmployeeManagementUsingEntityFramework;
using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly EmployeeDbContext _employeeDbContext;
        public RoleController(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddRole(RoleDto roleDto)
        {
            if (roleDto == null || string.IsNullOrWhiteSpace(roleDto.Name) )
            {
                return BadRequest("Invalid role data.");
            }
            var role=new Role { Name=roleDto.Name,
                                LocationId=roleDto.LocationId,
                                DepartmentId=roleDto.DepartmentId,
                                Id=roleDto.Id,
                                Description=roleDto.Description,
            };
            await  _employeeDbContext.Roles.AddAsync(role);
            await _employeeDbContext.SaveChangesAsync();
            return Ok(role);

        }

        [HttpGet]
        public async  Task<IActionResult> GetRoles()
        {
            var roleGroups = await _employeeDbContext.Roles
                                                     .Include(e => e.Employees)
                                                     .Include(d => d.Department)
                                                     .Include(l => l.Location)
                                                     .GroupBy(r => new { r.Name, r.Department.DepartmentName, r.Location.LocationName ,r.Id})
                                                     .ToListAsync();

            var roles = roleGroups.Select(g => new RoleSummaryDto
            {
                RoleId=g.Key.Id,
                Role = g.Key.Name,
                Department = g.Key.DepartmentName,
                Location = g.Key.LocationName,
                EmployeeCount = g.Sum(g2 => g2.Employees.Count)
            })
            .ToList();

            return Ok(roles);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetRolesById(int id)
        {


            var roles= _employeeDbContext.Roles.Where(role=>id==role.DepartmentId).ToList();
            await _employeeDbContext.SaveChangesAsync(); 
            if(roles==null || roles.Count==0) { return NotFound(new { Message="No Id Found"}); }
            return Ok(roles);
        }
        

    }
}
