import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { EmployeeDto } from '../models/employeeDto.interface';
import { Filter } from '../models/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private employeeSubject = new BehaviorSubject<any>([]);
  employee$ = this.employeeSubject.asObservable();
  AlphabetEmitter: any;
  constructor(private http: HttpClient) {}
  GetEmployees() {
    return this.http.get<EmployeeDto>('https://localhost:7098/api/Employee');
  }
  GetOneEmployee(id: string) {
    return this.http.get<any>(`https://localhost:7098/api/Employee/${id}`);
  }
  DeleteEmployee(id: string) {
    return this.http.delete<any>(`https://localhost:7098/api/Employee/${id}`);
  }
  DeleteEmployees(data) {
    const body = { ids: data };
    console.log(body)
    return this.http.delete('https://localhost:7098/api/Employee', {
      body: body,
    });
  }
  AddEmployee(data) {
    return this.http.post('https://localhost:7098/api/Employee', data);
  }
  UpdateEmployee(id, data) {
    return this.http.put(`https://localhost:7098/api/Employee/${id}`, data);
  }

  GetDepartments() {
    return this.http.get('https://localhost:7098/api/Departments');
  }

  GetRolesById(id) {
    return this.http.get(`https://localhost:7098/api/Role/id?id=${id}`);
  }
  GetRoles() {
    return this.http.get('https://localhost:7098/api/Role');
  }

  GetLocations() {
    return this.http.get('https://localhost:7098/api/Location');
  }
  GetProjects() {
    return this.http.get('https://localhost:7098/api/Projects');
  }
  AddRole(data) {
    return this.http.post('https://localhost:7098/api/Role', data);
  }
  GetFilteredData(filters: Filter) {
    return this.http.post(
      'https://localhost:7098/api/Employee/GetFilteredData',
      {
        alphabets: Array.from(filters.alphabets),
        locations: Array.from(filters.location),
        departments: Array.from(filters.department),
        status: Array.from(filters.status),
      }
    );
  }
  GetEmployeeByRoleId(roleId) {
    return this.http.get(
      `https://localhost:7098/api/Employee/Roleid?id=${roleId}`
    );
  }

}
