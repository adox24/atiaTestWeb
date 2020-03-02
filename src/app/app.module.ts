import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule,
    MatButtonModule, MatCardModule, MatTabsModule, MatInputModule, MatOptionModule,
    MatSelectModule, MatDialogModule, MatProgressBar, MatProgressBarModule, MatTooltipModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './presentation/sidenav/menu/menu.component';
import { HeaderComponent } from './presentation/sidenav/header/header.component';

import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './presentation/components/users/users.component';
import { SidenavService } from './core/services/sidenav.service';
import { MobileQueryService } from './core/services/mobileQuery.service';
import { MenuService } from './core/services/menu.service';
import { LoginComponent } from './presentation/components/login/login.component';
import { AuthenticationService } from './core/services/authentication.service';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPrintModule } from 'ngx-print';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { UserDetailsComponent } from './presentation/dialogs/user-details/user-details.component';
import { DatePipe } from '@angular/common';
import { AddUserComponent } from './presentation/dialogs/add-user/add-user.component';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HeaderComponent,
        UsersComponent,
        LoginComponent, UserDetailsComponent, AddUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatOptionModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatTabsModule,
        ChartsModule,
        MatTooltipModule,
        MatCardModule,
        FlexLayoutModule,
        NgxDatatableModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        NgxPrintModule,
        MatMenuModule, MatDatepickerModule, MatNativeDateModule,
        ToastrModule.forRoot()

    ],
    entryComponents: [UsersComponent,
        LoginComponent, UserDetailsComponent, AddUserComponent
    ],
    providers: [SidenavService, MobileQueryService, MenuService, AuthenticationService, DatePipe,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    exports: []

})
export class AppModule { }
