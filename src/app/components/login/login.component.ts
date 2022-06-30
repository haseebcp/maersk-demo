import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { LoginResponse } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy {

  constructor(
    public api: ApiService,
    public toastr: ToastrService,
    public authService: AuthService,
    public loaderService: NgxUiLoaderService,
    public router: Router) { }

  loginSubscription$: Subscription;
  loginForm: FormGroup;
  submitted: boolean = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
    if(this.authService.hasToken()){
      localStorage.removeItem("token");
      this.authService.islogInSubject.next(false);
    }
  }
  get f() {
    return this.loginForm.controls
  }
  onLogin(): void {
    this.loaderService.start();
    this.submitted = true;
    if (this.loginForm.valid) {

      this.loginSubscription$ = this.api.login(this.loginForm.value).subscribe((resp: LoginResponse) => {
        if (resp) {
          this.authService.login(resp.token);
          this.loaderService.stop();
        }
        this.authService.isLoggedIn().subscribe((isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(["user"]);
          }
        })
      })
    }
  }
  ngOnDestroy(): void {
    this.loginSubscription$?.unsubscribe();
  }
}
