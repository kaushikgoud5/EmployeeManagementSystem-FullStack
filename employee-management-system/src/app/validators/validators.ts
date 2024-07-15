import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, filter, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  constructor(private api: ApiService) {}
  static noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
  }
  uniqueEmployeeIdValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.api.GetOneEmployee(control.value).pipe(
      map((res) => {
        res=res['$values'][0]
        return res ? { uniqueEmployeeId: true } : null;
      })
    );
  }
  static joiningDateValidator(control: AbstractControl) {
    const formGroup = control;
    const dob = formGroup.get('dob')?.value;
    const joinDate = formGroup.get('joinDate')?.value;
    if (!dob || !joinDate) {
      return null;
    }
    const dobDate = new Date(dob);
    const joinDateDate = new Date(joinDate);
    const diffInYears=joinDateDate.getFullYear()-dobDate.getFullYear();
    if(joinDateDate<dobDate || diffInYears<=18){
      return { invalidJoiningDate: true }
    }
    return null;
  }
}
