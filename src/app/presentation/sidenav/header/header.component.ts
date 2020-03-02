import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { MobileQueryService } from 'src/app/core/services/mobileQuery.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
    @Input() sidenav: any;
    componentTitle = 'Pregled stanja' ;
    isMobile = false;
    constructor(private mobileQueryService: MobileQueryService,
                private router: Router, private activatedRoute: ActivatedRoute) {
                    const width = window.innerWidth;
                    if (width <= 799) {
    this.isMobile = true;
 } else {
    this.isMobile = false;
 }
                    this.mobileQueryService.isMobile.subscribe(res => {
            this.isMobile = res;
        });
                    this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
                let route = this.activatedRoute;
                while (route.firstChild) { route = route.firstChild; }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            map((route) => route.routeConfig)).subscribe((pathString) => { this.componentTitle = pathString.data.title; });
    }
    ngOnInit() {

    }
    ngOnChanges() {

    }
    refreshTitle() {}
}
