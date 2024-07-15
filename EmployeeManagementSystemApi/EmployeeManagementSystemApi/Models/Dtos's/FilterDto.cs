namespace EmployeeManagementSystemApi.Models.Dtos_s
{
    public class FilterDto
    {
        public List<int> Departments { get; set; }  
        public List<int> Locations { get; set; }  
        public List<int>? Statuses { get; set; }  
        public List<string> Alphabets { get; set; }  

    }
}
