using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmployeeManagementUsingEntityFramework.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int LocationId { get; set; }
        public Location? Location { get; set; }


        public Department? Department { get; set; }
        public int DepartmentId { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }


    }
}
