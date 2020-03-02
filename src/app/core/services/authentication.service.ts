import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public isLoading: Subject<boolean> = new Subject();

    constructor(private http: HttpClient, private toastr: ToastrService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        this.http.post("https://localhost:44343" + "/api/Authentication/authenticate", { username: username, password: password }).subscribe(x => {
            this.isLoading.next(false);

            localStorage.setItem('currentUser', JSON.stringify(x));
            localStorage.setItem('username', username);
            this.currentUserSubject.next(x);
            this.toastr.success("login success");

            return x;},
            error =>{
                this.currentUserSubject.next(null);
                this.toastr.error("login fail");
                this.isLoading.next(false);
            } 
);

    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
        this.currentUserSubject.next(null);
    }
}
