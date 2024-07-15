export interface EmployeeDto {
  $id: string;
  department: string;
  email: string;
  firstname: string;
  id: string;
  joinDate: string;
  lastname: string;
  location: string;
  manager: string | null;
  role: string;
  isChecked:boolean;  
  image:string;

}
