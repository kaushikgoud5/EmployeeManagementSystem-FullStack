import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { NgFor } from '@angular/common';
import { CustomValidators } from '../../../validators/validators';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css',
})
export class AddRoleComponent {
  constructor(private api: ApiService,private toasterService:ToasterService) {}
  roleReactiveForm: FormGroup;
  departments = [];
  locations = [];
  ngOnInit() {
    this.api.GetDepartments().subscribe({
      next: (res: any) => {
        this.departments = res['$values'];
      },
    });
    this.api.GetLocations().subscribe({
      next: (res: any) => {
        this.locations = res['$values'];
      },
    });
    this.roleReactiveForm = new FormGroup({
      roleName: new FormControl(null, [Validators.required]),
      department: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
    });
  }
  onClickAddRole() {
    console.log(this.roleReactiveForm.value);
    const data = {
      name: this.roleReactiveForm.value.roleName,
      description: this.roleReactiveForm.value.description,
      locationId: this.roleReactiveForm.value.location.locationId,
      departmentId: this.roleReactiveForm.value.department.departmentId,
    };
    this.api.AddRole(data).subscribe({
      next: (res) => {
        this.toasterService.onShowToast('Successfully Created','success')

      },
      error: (err) => {
        alert('Failed!!' + err);
        this.toasterService.onShowToast('Failed','error')
      },
    });
  }
  canExit():boolean{
    if(this.roleReactiveForm.touched && this.roleReactiveForm.dirty)
    return confirm("You have unsaved changes!! Do you want to leave the page!!")
    else
      return true;
  }
}
