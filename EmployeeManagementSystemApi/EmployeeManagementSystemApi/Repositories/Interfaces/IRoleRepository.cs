using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystemApi.Repositories.Interfaces
{
    public interface IRoleRepository
    {
        Task<IActionResult> AddRole(RoleDto roleDto);
        Task<IActionResult> GetRoles();
        Task<IActionResult> GetRolesById(int id);
    }
}
