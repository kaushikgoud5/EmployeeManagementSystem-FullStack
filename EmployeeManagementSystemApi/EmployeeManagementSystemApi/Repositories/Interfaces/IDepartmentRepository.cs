using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystemApi.Repositories.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<IActionResult> AddDepartmentAsync(DepartmentDto departmentDto);
        Task<IActionResult> GetActionResultAsync();

    }
}
