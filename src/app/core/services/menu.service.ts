import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { UsersComponent } from 'src/app/presentation/components/users/users.component';
import { MenuItem } from '../models/menu-item.model';
import { LoginComponent } from 'src/app/presentation/components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  routes: Route[] = [
    { path: 'users', component: UsersComponent, data: { title: 'Users' },
    canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, data: { title: 'Login' }},
    { path: '',  redirectTo: '/users', pathMatch: 'full' },
  
  ];
  public menuItems: MenuItem[] = [
    { name: 'Users', link: 'some-link', routerLink: '/users', icon: 'credit_card' },
];
  constructor() { }

  getRoutes() {
    return of(this.routes);
  }
  getMenuItems() {
    return of(this.menuItems);
  }
}
