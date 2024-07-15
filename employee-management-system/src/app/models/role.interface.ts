import { Department } from "./department.interface";

export interface Role {
  id: number;
  name: string;
  description: string;
  location: string;
  departmentId: number;
  department:Department;
}
