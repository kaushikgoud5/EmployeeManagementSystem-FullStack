import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { NgFor } from '@angular/common';
import { Role } from '../../../models/role.interface';
import { EmployeeDto } from '../../../models/employeeDto.interface';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [RouterLink, NgFor, RouterLinkActive],
  templateUrl: './role-card.component.html',
  styleUrl: './role-card.component.css',
})
export class RoleCardComponent {
  constructor(private api: ApiService,private filterService:FilterService) {}
  rolesData: Role[] = [];
  ngOnInit() {
    this.api.GetRoles().subscribe({
      next: (res: any) => {
        this.rolesData = res['$values'];
      },
    });
    this.filterService.FilterEmitter.subscribe((filter) => {
      this.api.GetFilteredData(filter).subscribe((res:EmployeeDto[]) => {
       this.rolesData=res['$values']
       console.log(res['$values'])
      });
    });

  }


}
