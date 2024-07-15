using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementUsingEntityFramework.Models
{
    public class RoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int LocationId {  get; set; }   

        public int DepartmentId {  get; set; }  

    }
}
