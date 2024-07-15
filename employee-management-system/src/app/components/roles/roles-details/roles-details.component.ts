import { Component } from '@angular/core';
import { FilterComponent } from '../../common/filter/filter.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { map } from 'rxjs';
import { NgFor } from '@angular/common';
import { Employee } from '../../../models/employee.interface';

@Component({
  selector: 'app-roles-details',
  standalone: true,
  imports: [FilterComponent, NgFor, RouterLink],
  templateUrl: './roles-details.component.html',
  styleUrl: './roles-details.component.css',
})
export class RolesDetailsComponent {
  constructor(private router: Router, private api: ApiService) {}
  roleDetails;
  data = [];
  roleId: number;
  ngOnInit() {
    this.roleDetails = [history.state];
    this.roleId = this.roleDetails[0]['roleId'];
    this.api.GetEmployeeByRoleId(this.roleId).subscribe({
      next: (res: any) => {
        this.data = res['$values'];
      },
    });
  }
}
