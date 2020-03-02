import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { onMainContentChange } from './presentation/animations/animations';
import { SidenavService } from './core/services/sidenav.service';
import { MobileQueryService } from './core/services/mobileQuery.service';
import { MenuService } from './core/services/menu.service';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [onMainContentChange]

})
export class AppComponent implements OnInit, OnDestroy {
    mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    opened: boolean;
    public onSideNavChange: number;
    currentUser: any;
    constructor(private mobileQueryService: MobileQueryService, private sidenavService: SidenavService,
                changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
                private menuService: MenuService, private authenticationService: AuthenticationService) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this.mobileQueryListener = () => {
            mobileQueryService.isMobile.next(this.mobileQuery.matches);
            changeDetectorRef.detectChanges();
        };
        this.mobileQuery.addEventListener('change', this.mobileQueryListener);
        this.sidenavService.sideNavState.subscribe(res => {
            if (!this.mobileQuery.matches && !res) {
                this.onSideNavChange = 0;
            } else if (this.mobileQuery.matches) {
                this.onSideNavChange = 1;
            } else {
                this.onSideNavChange = 2;
            }
        });
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
    ngOnInit(): void {
        const appRoutes = [...this.router.config];
        this.menuService.getRoutes().subscribe(res => {
            for (const route of res) {
                appRoutes.push(route);
            }
        });
        this.router.resetConfig(appRoutes);
        RouterModule.forRoot(appRoutes);

        this.authenticationService.currentUser.subscribe(res => {
            this.currentUser = res;
      });
    }
}
