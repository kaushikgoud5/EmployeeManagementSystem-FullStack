using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace EmployeeManagementUsingEntityFramework.Models
{
    public class Employee
    {

        [Key]
        public string? EmpId { get; set; }


        public string ImageData { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        [MaybeNull]
        public DateTime? DateOfBirth { get; set; }
        public string? Email { get; set; }

        [MaybeNull]
        public long? Phone { get; set; }


        public DateTime? JoinDate { get; set; }


        public int LocationId {  get; set; }
        public Location? Location { get; set; }

        public int RoleId { get; set; } 
        public Role? Role { get; set; }

        public string? Manager { get; set; }

        public int  ProjectID { get; set; }

        public Project? Project { get; set; }    



    }
}
