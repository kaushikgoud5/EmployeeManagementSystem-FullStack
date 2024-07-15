using EmployeeManagementUsingEntityFramework.Models;
using EmployeeManagementUsingEntityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementSystemApi;
using EmployeeManagementSystemApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;
        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetLocationAsync()
        {
            var locations=await _locationRepository.GetLocationAsync();
         /*   var locations = await _employeeDbContext.Locations.ToListAsync();*/
            return Ok(locations);
        }

        [HttpPost]
        public async Task<IActionResult> AddLocationAsync(Location locations)
        {

            if(locations == null) { return BadRequest(); }  
            var location=await _locationRepository.AddLocationAsync(locations);   
            return Ok(location);
        }
    }
}
