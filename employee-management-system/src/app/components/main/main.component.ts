import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';
import { NavBarComponent } from '../shared/navbar/navbar.component';
import { NgClass } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,SideMenuComponent,NavBarComponent,NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  title = 'employee-management-system';
  isSideBarHidden:boolean=true;
  isNavHidden(event:boolean){
    this.isSideBarHidden=event;
  }
}
