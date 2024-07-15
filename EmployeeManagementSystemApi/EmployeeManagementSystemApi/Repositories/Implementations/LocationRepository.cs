using EmployeeManagementSystemApi.Repositories.Interfaces;
using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystemApi.Repositories.Implementations
{
    public class LocationRepository:ILocationRepository
    {
        private readonly EmployeeDbContext _employeeDbContext;
        public LocationRepository(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }
        public async Task<IEnumerable<Location>> GetLocationAsync()
        {
            return await _employeeDbContext.Locations.ToListAsync();  
        }
        public async Task<Location> AddLocationAsync(Location locations)
        {
            await _employeeDbContext.Locations.AddAsync(locations);
            await _employeeDbContext.SaveChangesAsync();
            return locations;
        }
    }
}
