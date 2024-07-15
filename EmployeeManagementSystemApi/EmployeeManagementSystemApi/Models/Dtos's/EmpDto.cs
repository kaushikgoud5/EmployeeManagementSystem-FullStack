namespace EmployeeManagementSystemApi.Models.Dtos_s
{
    public class EmpDto
    {
        public string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email {  get; set; }  

        public string Location {  get; set; }
        public string Department {  get; set; }

        public string Role {  get; set; }

        public string Image {  get; set; }  

        public string Manager {  get; set; }

        public DateTime? JoinDate { get; set; }
    }
}
