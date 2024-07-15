import { Component } from '@angular/core';
import { FilterComponent } from '../../common/filter/filter.component';
import { DataTableComponent } from './data-table/data-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FilterComponent,DataTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
