// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    currentUser: User;
    constructor(public authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(res => {
            this.currentUser = res;
        });
     }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.currentUser != null)
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.currentUser.token}`
                }
            });
  
        return next.handle(request);
    }
}