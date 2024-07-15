using EmployeeManagementSystemApi.Models.Dtos_s;
using EmployeeManagementSystemApi.Repositories.Interfaces;
using EmployeeManagementUsingEntityFramework.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace EmployeeManagementSystemApi.Repositories.Implementations
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly EmployeeDbContext _employeeDbContext;
        public EmployeeRepository(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }
        public async Task<IEnumerable<EmpDto>> Get()
        {
            return await _employeeDbContext.Employees
            .Include(e => e.Role)
                .ThenInclude(r => r.Department)
            .Include(e => e.Location)
            .Select(e => new EmpDto
            {
                Id = e.EmpId,
                Firstname = e.FirstName,
                Lastname = e.LastName,
                Email = e.Email,
                Location = e.Location.LocationName,
                Department = e.Role.Department.DepartmentName,
                Role = e.Role.Name,
                Manager = e.Manager,
                JoinDate = e.JoinDate,
                Image=e.ImageData
            }).ToListAsync();
        }
        public async Task<IEnumerable<EmpDemoDto>> Get(string id)
        {
            var empl = await _employeeDbContext.Employees
                                               .Include(e => e.Role)
                                                .ThenInclude(r => r.Department)
                                            .Include(e => e.Location)
                                            .Where(e=>e.EmpId==id)
                                            .Select(e=>new EmpDemoDto
                                            {
                                                Id=e.EmpId,
                                                Firstname = e.FirstName,
                                                Lastname = e.LastName,
                                                Email = e.Email,
                                                Location = e.Location.LocationId,
                                                Department = e.Role.Department.DepartmentId,
                                                Role = e.Role.Id,
                                                Manager = e.Manager,
                                                JoinDate = e.JoinDate,
                                                Mobile=e.Phone,
                                                Project=e.Project.ProjectId,
                                                DateOfBirth=e.DateOfBirth,
                                                Image=e.ImageData
                                                

                                            })
                                                .ToListAsync() ;

            return empl;

        }

       public async Task<ActionResult<Employee>> Delete(string id)
        {
            var emp = await _employeeDbContext.Employees.FirstOrDefaultAsync(x => x.EmpId == id);
            if (emp != null) {
                _employeeDbContext.Employees.Remove(emp);
                _employeeDbContext.SaveChanges();
            }
            return emp;
        }
        public  void DeleteEmployees(DeleteIdsDto deleteIds)
        {
            var tobeDeleted=_employeeDbContext.Employees.Where(e=>deleteIds.Ids.Contains(e.EmpId)).ToList();
            _employeeDbContext.RemoveRange(tobeDeleted);
            _employeeDbContext.SaveChanges();
        }

        public async Task<ActionResult<Employee>> Post(Employee emp)
        {
            var employee = new Employee
            {
                EmpId = emp.EmpId,
                FirstName = emp.FirstName,
                LastName = emp.LastName,
                DateOfBirth = emp.DateOfBirth,
                JoinDate = emp.JoinDate,
                Manager = emp.Manager,
                LocationId = emp.LocationId,
                Phone = emp.Phone,
                ProjectID = emp.ProjectID,
                RoleId = emp.RoleId,
                Email = emp.Email,
                ImageData = emp.ImageData,
            };

            await _employeeDbContext.Employees.AddAsync(employee);
           await  _employeeDbContext.SaveChangesAsync();
            return emp;
        }

        public async Task<bool> CheckIdExists(string? empId)
        {
            return await _employeeDbContext.Employees.AnyAsync(e => e.EmpId == empId);
        }

        public async Task<ActionResult<EmpDemoDto>> Put(EmpDemoDto emp, string id)
        {
            var employee = await _employeeDbContext.Employees.FirstOrDefaultAsync(x => x.EmpId == id);
            if (employee == null) { return null; }
            employee.FirstName = emp.Firstname;
            employee.LastName = emp.Lastname;
            employee.LocationId = emp.Location;
            employee.ProjectID = emp.Project;
            employee.JoinDate = emp.JoinDate;
            employee.Email = emp.Email;
            employee.Phone = emp.Mobile;
            employee.Manager = emp.Manager;
            employee.RoleId = emp.Role;
            employee.DateOfBirth = emp.DateOfBirth;
            employee.ImageData = emp.Image;
/*            employee.Role.Department.DepartmentId = emp.Department;
*/            _employeeDbContext.Employees.Update(employee);
             _employeeDbContext.SaveChanges();
            return emp;
        }
        public async  Task<IEnumerable<EmpDto>> GetFilteredData(FilterDto filters)
        {
            var employees = await _employeeDbContext.Employees
                                                    .Include(e => e.Role)
                                                    .ThenInclude(r => r.Department)
                                                    .Include(e => e.Location)
                                                    .Where(e =>
                                            (filters.Alphabets.Count == 0 || filters.Alphabets.Contains(e.FirstName.Substring(0, 1).ToUpper())) &&
                                            (filters.Locations.Count == 0 || filters.Locations.Contains(e.LocationId)) &&
                                            (filters.Departments.Count == 0 || filters.Departments.Contains(e.Role.DepartmentId)) )
                                              .Select(e => new EmpDto
                                              {
                                                  Id = e.EmpId,
                                                  Firstname = e.FirstName,
                                                  Lastname = e.LastName,
                                                  Email = e.Email,
                                                  Location = e.Location.LocationName,
                                                  Department = e.Role.Department.DepartmentName,
                                                  Role = e.Role.Name,
                                                  Manager = e.Manager,
                                                  JoinDate = e.JoinDate,
                                                  Image=e.ImageData
                                                 
                                              })
                                            .ToListAsync();
            return employees;
        }


        public async Task<IEnumerable<EmpDto>> GetEmployeeByRoleId(int id)
        {
            var employee = await _employeeDbContext.Employees.Where(emp => id == emp.RoleId)
                                                            .Include(r => r.Role)
                                                            .ThenInclude(d => d.Department)
                                                            .Include(l => l.Location)
                                                            .Select(e => new EmpDto
                                                            {
                                                                Id = e.EmpId,
                                                                Firstname = e.FirstName,
                                                                Lastname = e.LastName,
                                                                Email = e.Email,
                                                                Location = e.Location.LocationName,
                                                                Department = e.Role.Department.DepartmentName,
                                                                Role = e.Role.Name,
                                                                Manager = e.Manager,
                                                                JoinDate = e.JoinDate,
                                                                Image=e.ImageData
                                                            })
                                                            .ToListAsync();
            return employee;
        }

    }
}
