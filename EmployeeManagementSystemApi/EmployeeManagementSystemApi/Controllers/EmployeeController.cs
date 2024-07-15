using EmployeeManagementSystemApi;
using EmployeeManagementSystemApi.Models.Dtos_s;
using EmployeeManagementSystemApi.Repositories.Interfaces;
using EmployeeManagementUsingEntityFramework;
using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employee)
        {
            _employeeRepository = employee;
        }


        [HttpGet]
        public async Task<ActionResult<Employee>> Get()
        {
            var employees = await _employeeRepository.Get();
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(string id)
        {
            var employees= await _employeeRepository.Get(id);   

            if (employees == null)
            {
                return NotFound(new { Message = "Employee Id is Not There" });
            }
            return Ok(employees);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(string id)
        {

            var employee= await _employeeRepository.Delete(id);

            return Ok(employee);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployees([FromBody]DeleteIdsDto model)
        {
            if (model == null || model.Ids==null || !model.Ids.Any())
            {
                return BadRequest();
            }
           _employeeRepository.DeleteEmployees(model);
            return Ok(new { Message="Successfully Deleted"});

        }

        [HttpPost]
        public async Task<ActionResult<Employee>> Post(Employee emp)
        {
            if (emp == null)
            {
                return BadRequest();
            }
            if (await CheckIdExists(emp.EmpId))
            {
                return BadRequest(new { Message = "Employee Id Already Exsits" });
            }

            await _employeeRepository.Post(emp);

            return Ok(emp);
        }

        private async Task<bool> CheckIdExists(string? empId)
        {
            return await _employeeRepository.CheckIdExists(empId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(EmpDemoDto emp, string id)
        {
            var employee= await _employeeRepository.Put(emp,id);

            return Ok(employee);
        }

        [HttpPost("GetFilteredData")]
        public async Task<ActionResult<EmpDto>> GetFilteredData(FilterDto filterDto)
        {
           var empl=await _employeeRepository.GetFilteredData(filterDto);
            return Ok(empl);
        }


        [HttpGet("Roleid", Name = "GetEmployeeByRole")]
        public async Task<IActionResult> GetEmployeeByRoleId(int id)
        {

            var employee =await _employeeRepository.GetEmployeeByRoleId(id);
            if (employee == null ) { return NotFound(new { Message = "No Id Found" }); }
            return Ok(employee);
        }

    }
}
