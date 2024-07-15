import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Subject, from, map } from 'rxjs';
import { CustomValidators } from '../../../validators/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee.interface';
import { Role } from '../../../models/role.interface';
import { Department } from '../../../models/department.interface';
import { ToasterComponent } from '../../common/toaster/toaster.component';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgStyle],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  constructor(
    private api: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private validator: CustomValidators,
    private toasterService: ToasterService
  ) {}
  reactiveForm: FormGroup;
  departments: Department[] = [];
  fetchedRoles = [];
  locations = [];
  projects = [];
  managers = [];
  empIdForUpdating: string;
  action: number;
  imageName: string;
  selectedFile: File | null = null;
  selectedUrl: string;
  @ViewChild('profilePic') profilePic: ElementRef;

  ngOnInit() {
    this.fetchDepartments();
    this.fetchLocations();
    this.fetchManagers();
    this.fetchProjects();

    this.activateRoute.data.subscribe((res) => {
      this.action = res['action'];
    });
    this.reactiveForm = new FormGroup(
      {
        empId: new FormControl(
          null,
          [Validators.pattern('^TZ\\d{4}$'), Validators.required],
          this.validator.uniqueEmployeeIdValidator.bind(this.validator)
        ),
        firstname: new FormControl(null, [
          Validators.required,
          CustomValidators.noSpaceAllowed,
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          CustomValidators.noSpaceAllowed,
        ]),
        department: new FormControl(null, Validators.required),
        location: new FormControl(null, Validators.required),
        project: new FormControl(null, Validators.required),
        manager: new FormControl(null, Validators.required),
        joinDate: new FormControl(null, [Validators.required]),
        dob: new FormControl(null),
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          CustomValidators.noSpaceAllowed,
        ]),
        phone: new FormControl(null, Validators.pattern('^[0-9]{10}$')),
        jobTitle: new FormControl(null),
      },
      { validators: CustomValidators.joiningDateValidator }
    );
    this.activateRoute.params.subscribe({
      next: (res) => {
        this.empIdForUpdating = res['id'];
      },
    });
    if (this.action == 3) {
      this.reactiveForm.get('empId').disable();
      this.showDataInForm(this.empIdForUpdating);
    }
    if (this.action == 2) {
      this.showDataInForm(this.empIdForUpdating);
      this.reactiveForm.disable();
    }
  }
  ngDoCheck() {
    if (this.reactiveForm.get('department').value) {
      this.reactiveForm.get('jobTitle').enable();
    } else {
      this.reactiveForm.get('jobTitle').disable();
    }
    console.log(this.reactiveForm)
  }
  onClickGoBack() {
    this.toasterService.onShowToast('bye', 'success');
    this.router.navigate(['main/employee']);
  }
  showDataInForm(empIdForUpdating: string) {
    this.api.GetOneEmployee(empIdForUpdating).subscribe({
      next: (res) => {
        res = res['$values'][0];
        this.reactiveForm.get('empId').setValue(res.id);
        this.reactiveForm.get('firstname').setValue(res.firstname);
        this.reactiveForm.get('lastname').setValue(res.lastname);
        this.reactiveForm.get('department').setValue(res.department);
        this.reactiveForm.get('location').setValue(res.location);
        this.reactiveForm.get('project').setValue(res.project);
        this.reactiveForm.get('manager').setValue(res.manager);
        this.reactiveForm.get('joinDate').setValue(res.joinDate.split('T')[0]);
        this.reactiveForm.get('dob').setValue(res.dateOfBirth.split('T')[0]);
        this.reactiveForm.get('email').setValue(res.email);
        this.reactiveForm.get('phone').setValue(res.mobile);
        this.reactiveForm.get('jobTitle').setValue(res.role);
        this.profilePic.nativeElement.src = res.image;
      },
    });
  }
  onChangeDepartment(department: number) {
    console.log(department);
    this.api.GetRolesById(department).subscribe({
      next: (res: any) => {
        this.fetchedRoles = res['$values'];
      },
      error: (err) => {
        this.fetchedRoles = [];
      },
    });
  }
  onClickAddEmployee() {
        const data = {
      empId: this.reactiveForm.value.empId,
      firstName: this.reactiveForm.value.firstname,
      lastName: this.reactiveForm.value.lastname,
      dateOfBirth: this.reactiveForm.value.dob,
      email: this.reactiveForm.value.email,
      phone: this.reactiveForm.value.phone,
      joinDate: this.reactiveForm.value.joinDate,
      locationId: this.reactiveForm.value.location,
      roleId: this.reactiveForm.value.jobTitle,
      manager: this.reactiveForm.value.manager,
      projectId: this.reactiveForm.value.project,
      imageData: this.selectedUrl,
    };
    this.api.AddEmployee(data).subscribe({
      next: (res) => {
        this.toasterService.onShowToast('Successfully Added', 'success');
        this.router.navigate(['main/employee']);
      },
      error: (err) => {
        this.toasterService.onShowToast('Failed!', 'error');
      },
    });
    this.reactiveForm.reset();
  }
  onClickUpdateEmployee() {
    const data = {
      id: this.empIdForUpdating,
      firstname: this.reactiveForm.value.firstname,
      lastname: this.reactiveForm.value.lastname,
      dateOfBirth: this.reactiveForm.value.dob,
      email: this.reactiveForm.value.email,
      mobile: this.reactiveForm.value.phone,
      joinDate: this.reactiveForm.value.joinDate,
      location: this.reactiveForm.value.location,
      role: this.reactiveForm.value.jobTitle,
      manager: this.reactiveForm.value.manager,
      project: this.reactiveForm.value.project,
      // department:this.reactiveForm.value.department,
      image: this.profilePic.nativeElement.src,
    };
    this.reactiveForm.get('jobTitle').enable();
    this.api.UpdateEmployee(this.empIdForUpdating, data).subscribe({
      next: (res) => {
        this.toasterService.onShowToast('Update Success!', 'success');
        console.log(res);
        this.router.navigate(['main/employee']);
      },
      error: (err) => {
        this.toasterService.onShowToast('Update Failed!', 'error');
      },
    });
  }

  canExit(): boolean {
    if (this.reactiveForm.touched && this.reactiveForm.dirty)
      return confirm(
        'You have unsaved changes!! Do you want to leave the page!!'
      );
    else return true;
  }


  onChangeImageUpload(event: Event, profilePic: HTMLImageElement) {
    const file = event.target['files'][0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        profilePic.src = reader.result;
        this.selectedUrl = reader.result;
      }
    });
  }
  fetchDepartments() {
    this.api.GetDepartments().subscribe({
      next: (res: Department[]) => {
        this.departments = res['$values'];
      },
    });
  }
  fetchLocations() {
    this.api.GetLocations().subscribe({
      next: (res: any) => {
        this.locations = res['$values'];
      },
    });
  }
  fetchManagers() {
    this.api.GetEmployees().subscribe((res) => {
      this.managers = res['$values'].map((x) => x.firstname + ' ' + x.lastname);
    });
  }
  fetchProjects() {
    this.api.GetProjects().subscribe({
      next: (res: any) => {
        this.projects = res['$values'];
      },
    });
  }
}
