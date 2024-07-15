using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystemApi.Repositories.Interfaces
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> GetLocationAsync();
        Task<Location> AddLocationAsync(Location locations);
    }
}
