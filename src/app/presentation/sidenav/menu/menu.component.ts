import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { MenuItem } from 'src/app/core/models/menu-item.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    animations: [onSideNavChange, animateText]
})
export class MenuComponent implements OnInit {
    public sideNavState = true;
    public linkText = true;
    public menuItems: MenuItem[] = [
    ];

    constructor(private sidenavService: SidenavService, private menuService: MenuService,
                private authenticationService: AuthenticationService, private router: Router ) {
        this.menuService.getMenuItems().subscribe(res => {
            for (const menuItem of res) {
                this.menuItems.push(menuItem);
            }
        });
    }
    ngOnInit() {
    }
    onSinenavToggle() {
        this.sideNavState = !this.sideNavState;
        setTimeout(() => {
            this.linkText = this.sideNavState;
        }, 200);

        this.sidenavService.sideNavState.next(this.sideNavState);
    }
    Logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);

    }
}
