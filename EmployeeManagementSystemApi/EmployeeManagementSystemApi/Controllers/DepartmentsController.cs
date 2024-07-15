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
    public class DepartmentsController : ControllerBase
    {
        private readonly EmployeeDbContext _employeeDbContext;
        public DepartmentsController(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddDepartmentAsync(DepartmentDto departmentDto)
        {
            if (departmentDto == null || string.IsNullOrWhiteSpace(departmentDto.Name))
            {
                return BadRequest("Invalid department data.");
            }
            var departments=new Department { DepartmentId = departmentDto.Id ,DepartmentName=departmentDto.Name};
            await _employeeDbContext.Departments.AddAsync(departments);
            await _employeeDbContext.SaveChangesAsync();
            return Ok(departments);

        }

        [HttpGet]
        public async Task<IActionResult> GetActionResultAsync()
        {
            var dept= await _employeeDbContext.Departments.ToListAsync();
            return Ok(dept);
        }
    }
}
