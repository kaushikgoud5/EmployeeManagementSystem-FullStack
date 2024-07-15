using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystemApi.Repositories.Interfaces
{
    public interface IProjectRepository
    {
        Task<IActionResult> GetProjectsAsync();
        Task<IActionResult> AddProjectsAsync(Project projects);
    }
}
