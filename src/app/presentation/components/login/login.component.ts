import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoging = false;
  currentUser: User;
  constructor(private router: Router, private route: ActivatedRoute,
               private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(res => {
      this.currentUser = res;

      if (this.currentUser != null) {
        this.router.navigate(['/']);
      }

    });
    this.authenticationService.isLoading.subscribe(res => {this.isLoging = res; });

  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
  this.isLoging = true;
  this.authenticationService.login(this.f.username.value, this.f.password.value);
  }
  get f() { return this.loginForm.controls; }

}
