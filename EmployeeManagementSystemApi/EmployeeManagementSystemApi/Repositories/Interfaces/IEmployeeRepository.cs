using EmployeeManagementSystemApi.Models.Dtos_s;
using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystemApi.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<EmpDto>>   Get();
        Task<IEnumerable<EmpDemoDto>> Get(string id);
        Task<ActionResult<Employee>> Delete(string id);
        Task<ActionResult<Employee>> Post(Employee emp);
        Task<ActionResult<EmpDemoDto>> Put(EmpDemoDto emp, string id);
        Task<IEnumerable<EmpDto>> GetFilteredData(FilterDto filterDto);
        Task<IEnumerable<EmpDto>> GetEmployeeByRoleId(int id);
        Task<bool> CheckIdExists(string? empId);
        void DeleteEmployees( DeleteIdsDto deleteIdsDto);
    }
}
