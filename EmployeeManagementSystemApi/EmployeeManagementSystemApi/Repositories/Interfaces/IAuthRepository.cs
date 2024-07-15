using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystemApi.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<IActionResult> Authenticate([FromBody] User userObj);
        Task<IActionResult> Register([FromBody] User userObj);
        Task<ActionResult<User>> GetAllUsers();
    }
}
