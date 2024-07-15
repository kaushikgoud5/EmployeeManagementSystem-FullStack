import { NgClass, NgFor, NgIf, NgStyle} from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Department } from '../../../models/department.interface';
import * as FileSaver from 'file-saver';
import { CsvService } from '../../../services/csv.service';
import { FilterService } from '../../../services/filter.service';
import { FormsModule } from '@angular/forms';
import { Filter } from '../../../models/filter.interface';
import { Location } from '../../../models/location.interface';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, NgClass, NgStyle, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @ViewChild('statusActive') statusActive:ElementRef;
  @ViewChild('departmentActive') departmentActive:ElementRef;
  @ViewChild('locationActive') locationActive:ElementRef;

  alphabets: string[];
  currentComponent: string;
  activeAlphabets: { [key: string]: boolean } = {};
  isDepartmentActive: boolean = false;
  isLocationActive: boolean = false;
  isStatusActive: boolean = false;
  filterCriteria: Filter = {
    department: new Set<number>(),
    location: new Set<number>(),
    status: new Set<number>(),
    alphabets: new Set<string>(),
  };
  dropDownFilters = {
    department: new Set<number>(),
    location: new Set<number>(),
    status: new Set<number>(),
  };
  departments: Department[] = [];
  locations: Location[] = [];
  status: string[] = ['Active', 'Inactive'];
  selectedDepartmentCount: number = 0;
  selectedLocationCount: number = 0;
  selectedStatusCount: number = 0;
  isAllDepartmentsChecked: boolean = false;
  isAllLocationsChecked: boolean = false;
  isAllStatusChecked: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private csvService: CsvService,
    private filterService: FilterService
  ) {
    this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }
  ngOnInit() {
    this.currentComponent = this.activatedRoute.component.name;
    this.api.GetDepartments().subscribe({
      next: (res: Department[]) => {
        this.departments = res['$values'];
      },
    });
    this.api.GetLocations().subscribe({
      next: (res: Location[]) => {
        this.locations = res['$values'];
      },
    });
    document.body.addEventListener('click',(event)=>{
      this.handleCloseFilter(event);
    })
  }
  private handleCloseFilter(event:Event){
    if(this.departmentActive?.nativeElement && !this.departmentActive.nativeElement.contains(event.target)){
      this.isDepartmentActive=false;

    }
    if(this.locationActive?.nativeElement && !this.locationActive.nativeElement.contains(event.target)){
      this.isLocationActive=false;
    }
    if(this.statusActive?.nativeElement && !this.statusActive.nativeElement.contains(event.target)){
      this.isStatusActive=false;
    }
  }
  onClickAlphabet(alphabet: string) {
    this.activeAlphabets[alphabet] = !this.activeAlphabets[alphabet];
    if (this.filterCriteria.alphabets.has(alphabet)) {
      this.filterCriteria.alphabets.delete(alphabet);
    } else {
      this.filterCriteria.alphabets.add(alphabet);
    }
    this.filterService.onClickFilterEmit(this.filterCriteria);
  }
  isActive(alphabet: string): boolean {
    return this.activeAlphabets[alphabet];
  }
  toggleDepartmentDropdown(event) {
    this.isDepartmentActive = !this.isDepartmentActive;
  }
  toggleLocationDropdown(event) {
    this.isLocationActive = !this.isLocationActive;
  }
  toggleStatusDropdown(event) {
    this.isStatusActive = !this.isStatusActive;
  }
  ngDoCheck() {
    this.isAllDepartmentsChecked =
      this.selectedDepartmentCount === this.departments.length;
    this.isAllLocationsChecked =
      this.selectedLocationCount === this.locations.length;
  }
  onClickSelectAll(selectAll: HTMLInputElement, title: string) {
    if (title === 'department') {
      this.toggleSelectAll(selectAll.checked, this.departments, 'isAllDepartmentsChecked', 'selectedDepartmentCount');
    } else if (title === 'location') {
      this.toggleSelectAll(selectAll.checked, this.locations, 'isAllLocationsChecked', 'selectedLocationCount');
    } 
  }
  toggleSelectAll(isChecked: boolean, items: any[], isAllCheckedProp: string, selectedCountProp: string) {
    this[isAllCheckedProp] = isChecked;
    this[selectedCountProp] = isChecked ? items.length : 0;
    items.forEach(item => item.isChecked = isChecked);
  }

  onClickDropDownFilter(
    set: Set<number>,
    id: number,
    checkbox: HTMLInputElement,
    filterArr,
    name: string
  ) {
    if (name === 'loc') {
      if (checkbox.checked) {
        this.selectedLocationCount += 1;
        filterArr.find((x) => x.locationId === id).isChecked = true;
      } else {
        this.selectedLocationCount -= 1;

        filterArr.find((x) => x.locationId === id).isChecked = false;
      }
    }
    if (name === 'Dept') {
      if (checkbox.checked) {
        this.selectedDepartmentCount += 1;
        filterArr.find((x) => x.departmentId === id).isChecked = true;
      } else {
        this.selectedDepartmentCount -= 1;
        filterArr.find((x) => x.departmentId === id).isChecked = false;
      }
    }

    if (set.has(id)) set.delete(id);
    else set.add(id);
  }
  resetFilterOptions() {
    this.departments.map((x) => (x.isChecked = false));
    this.locations.map((x) => (x.isChecked = false));
    this.selectedDepartmentCount = 0;
    this.selectedLocationCount = 0;
    this.filterCriteria.department.clear();
    this.filterCriteria.location.clear();
    this.filterCriteria.status.clear();
    this.filterService.onClickFilterEmit(this.filterCriteria);
  }
  exportToCSV() {
    this.csvService.exportEvent.emit();
  }
  applyFiltersAndDisplayResults() {
    this.filterCriteria.department = this.dropDownFilters.department;
    this.filterCriteria.location = this.dropDownFilters.location;
    this.filterCriteria.status = this.dropDownFilters.status;
    this.filterService.onClickFilterEmit(this.filterCriteria);
  }
}
