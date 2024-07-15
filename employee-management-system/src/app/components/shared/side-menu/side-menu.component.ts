import { NgClass, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle, RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  isSideMenuHidden: boolean = true;
  @Output()
  eventEmmiter: EventEmitter<boolean> = new EventEmitter<boolean>();
  SwitchMode() {
    this.isSideMenuHidden = !this.isSideMenuHidden;
    this.eventEmmiter.emit(this.isSideMenuHidden);
  }
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateImgSrc(event.urlAfterRedirects);
      });  }
  imgSrc: string="Roles";
  currentemployee: string="Employees";
  updateImgSrc(name) {
    this.imgSrc = (name === 'main/roles') ? 'Roles-red' : 'Roles';
    this.currentemployee = (name === 'main/employee') ? 'Employees' : 'Employees-reoles';
  }
}
