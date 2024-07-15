import { Department } from "./department.interface";
import { Location } from "./location.interface";
import { Project } from "./project.interface";
import { Role } from "./role.interface";

export interface Employee {
  empId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: number;
  joinDate: string;
  locationId: number;
  roleId: number;
  manager: string;
  projectID: number;
  role:Role,
  project:Project,
  location:Location,
}
