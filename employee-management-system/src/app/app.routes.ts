import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/employee/add-update-view/add-employee.component';
import { AddRoleComponent } from './components/roles/add-role/add-role.component';
import { RolesComponent } from './components/roles/roles.component';
import { RolesDetailsComponent } from './components/roles/roles-details/roles-details.component';
import { RouteEnum } from './enums/route.enum';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/employee/home/home.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'employee', component: HomeComponent },
      {
        path: 'employee/addEmployee',
        component: AddEmployeeComponent,
        data: { action: RouteEnum.AddEmployee },
        canDeactivate: [
          (comp: AddEmployeeComponent) => {
            return comp.canExit();
          },
        ],
      },
      {
        path: 'employee/addEmployee/:id',
        component: AddEmployeeComponent,
        data: { action: RouteEnum.EditEmployee },
        canDeactivate: [
          (comp: AddEmployeeComponent) => {
            return comp.canExit();
          },
        ],
      },
      {
        path: 'employee/addEmployee/:id',
        component: AddEmployeeComponent,
        data: { action: RouteEnum.EditEmployee },
        canDeactivate: [
          (comp: AddEmployeeComponent) => {
            return comp.canExit();
          },
        ],
      },
      {
        path: 'employee/addEmployee/view/:id',
        component: AddEmployeeComponent,
        data: { action: RouteEnum.ViewEmployee },
      },
      {
        path: 'roles/addRole',
        component: AddRoleComponent,
        canDeactivate: [
          (comp: AddRoleComponent) => {
            return comp.canExit();
          },
        ],
      },
      { path: 'roles/roleDetails', component: RolesDetailsComponent },
      {
        path: 'roles',
        loadComponent: () =>
          import('./components/roles/roles.component').then(
            (c) => c.RolesComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: 'main/employee', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
