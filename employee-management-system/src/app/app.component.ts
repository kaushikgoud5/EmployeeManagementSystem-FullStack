import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/shared/side-menu/side-menu.component';
import { NavBarComponent } from './components/shared/navbar/navbar.component';
import { NgClass } from '@angular/common';
import { ToasterComponent } from './components/common/toaster/toaster.component';
import { LoaderComponent } from './components/common/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToasterComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  


}

