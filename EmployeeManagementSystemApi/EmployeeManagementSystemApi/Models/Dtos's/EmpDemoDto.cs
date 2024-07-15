namespace EmployeeManagementSystemApi.Models.Dtos_s
{
    public class EmpDemoDto
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }

        public int Location { get; set; }
        public int Department { get; set; }

        public int Role { get; set; }

        public string Manager { get; set; }

        public DateTime? JoinDate { get; set; }

        public DateTime? DateOfBirth { get; set;}

        public long? Mobile { get; set; }
        public int Project { get; set; }

        public string Image {  get; set; }  
    }
}
