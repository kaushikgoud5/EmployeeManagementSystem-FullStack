using EmployeeManagementSystemApi;
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
    public class ProjectsController : ControllerBase
    {
        private readonly EmployeeDbContext _employeeDbContext;
        public ProjectsController(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetProjectsAsync()
        {
            var projects=await _employeeDbContext.Projects.ToListAsync();
            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> AddProjectsAsync(Project projects)
        {
           await _employeeDbContext.Projects.AddAsync(projects);
            await _employeeDbContext.SaveChangesAsync();
            return Ok(projects);    
        }
    }
}
