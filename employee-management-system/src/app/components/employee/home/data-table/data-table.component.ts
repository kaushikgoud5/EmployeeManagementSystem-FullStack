import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Employee } from '../../../../models/employee.interface';
import { CsvService } from '../../../../services/csv.service';
import { FilterService } from '../../../../services/filter.service';
import { EmployeeDto } from '../../../../models/employeeDto.interface';
import { ToasterService } from '../../../../services/toaster.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink,NgStyle],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  selectedAlphabet: string;
  data: EmployeeDto[] = [];
  isEllipsisHidden: boolean = false;
  isAscending: boolean = false;
  toBeFilter = new Set();
  isSelectAllChecked: boolean = false;
  selectedCheckCount:number=0;
  employeesToBeDeleted=[];
  constructor(
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private csvService: CsvService,
    private filterService: FilterService,
    private  tosterService:ToasterService
  ) {
   
  }
  ngOnInit() {
    this.fetchEmployees();
    this.fetchFilteredEmployees();
  }
  SwitchEllipsis(event, idx) {
    const ellipsisArray = document.getElementsByClassName('ellipsis');
    for (let i = 0; i < ellipsisArray.length; i++) {
      if (i != idx && !ellipsisArray[i].classList.contains('d-none')) {
        ellipsisArray[i].classList.toggle('d-none');
      }
    }
    document
      .getElementById(`ellipsis-table-${idx}`)
      ?.classList.toggle('d-none');
  }
  ngDoCheck(){
    if(this.selectedCheckCount===this.data.length){
      this.isSelectAllChecked=true;
    }
    else{
      this.isSelectAllChecked=false;
    }
  }
  onClickSingleCheckBox(check,empId){
    if(check.checked){
      this.data.find((x)=>x.id===empId).isChecked=true;
      this.selectedCheckCount+=1;
    }
    else{
      this.data.find((x)=>x.id===empId).isChecked=false;
      this.selectedCheckCount-=1;
    }
  }
  onClickSelectAllCheckBoxes(checkAll: HTMLInputElement) {
    if (checkAll.checked) {
      this.selectedCheckCount=this.data.length;
      this.data.map((x) => (x.isChecked = true));
      this.isSelectAllChecked = true;
    } else {
      this.selectedCheckCount=0;
      this.data.map((x) => (x.isChecked = false));
      this.isSelectAllChecked = false;
    }
  }

  ngAfterViewInit(): void {
    this.csvService.exportEvent.subscribe(() => {
      this.downloadButtonClicked();
    });
  }
  downloadButtonClicked() {
    this.csvService.downloadCSV(this.data, 'my-data.csv');
  }
  fetchEmployees(){
    this.api.GetEmployees().subscribe({
      next: (res) => {
        this.data = res['$values'];
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
  fetchFilteredEmployees(){
    this.filterService.FilterEmitter.subscribe((filter) => {
      this.api.GetFilteredData(filter).subscribe((res: EmployeeDto[]) => {
        this.data = res['$values'];
      });
    });
  }
   
  onClickDelete(empId: string) {
    confirm("Do yoy want to delete the data")?
    this.api.DeleteEmployee(empId).subscribe({
      next: (res) => {
        this.tosterService.onShowToast("Successfuly deleted",'success')
      },
      error: (err) => {
        this.tosterService.onShowToast("Failed",'error')
      },
      complete:()=>{
        this.fetchEmployees();
      }
    }):"";
  }

  sortEmployeeData(column: string) {
    this.isAscending = !this.isAscending;
    switch (column) {
      case 'firstName':
        this.data.sort((a, b) =>
          a.firstname < b.firstname
            ? this.isAscending
              ? -1
              : 1
            : a.firstname > b.firstname
            ? this.isAscending
              ? 1
              : -1
            : 0
        );
        break;
      case 'location':
        this.data.sort((a, b) =>
          a.location < b.location
            ? this.isAscending
              ? -1
              : 1
            : a.location > b.location
            ? this.isAscending
              ? 1
              : -1
            : 0
        );
        break;
      case 'department':
        this.data.sort((a, b) =>
          a.department < b.department
            ? this.isAscending
              ? -1
              : 1
            : a.department > b.department
            ? this.isAscending
              ? 1
              : -1
            : 0
        );
        break;
      case 'role':
        this.data.sort((a, b) =>
          a.role < b.role
            ? this.isAscending
              ? -1
              : 1
            : a.role > b.role
            ? this.isAscending
              ? 1
              : -1
            : 0
        );
        break;
      case 'empId':
        this.data.sort((a, b) =>
          a.id < b.id
            ? this.isAscending
              ? -1
              : 1
            : a.id > b.id
            ? this.isAscending
              ? 1
              : -1
            : 0
        );
        break;
      case 'joinDate':
        this.data.sort((a, b) =>
          a.joinDate < b.joinDate
            ? this.isAscending
              ? -1
              : 1
            : a.joinDate > b.joinDate
            ? this.isAscending
              ? 1
              : -1
            : 0
        );
        break;
      default:
        break;
    }
  }
  onClickDeleteEmployee(){
   if(this.selectedCheckCount>0){
    this.employeesToBeDeleted=(this.data.filter((x)=>x.isChecked===true).map((y)=>y.id));
    confirm("Do want to delete tha data")?
    this.api.DeleteEmployees(this.employeesToBeDeleted).subscribe({
      next:(res)=>{
        this.tosterService.onShowToast("Successfuly deleted",'success')
      },error:()=>{
        this.tosterService.onShowToast("Failed",'error')
      },
      complete:()=>{
        this.fetchEmployees();
      }
    }):""
   } 
  }
}
