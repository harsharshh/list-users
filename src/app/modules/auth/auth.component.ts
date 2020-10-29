import {Component, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../home/service/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder,
              private loginService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    const data = this.activatedRoute.snapshot.data.authResolver;
    if (!!data && data === true) {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    this.loginForm = this.fb.group({
      email: ['eve.holt@reqres.in', Validators.required],
      password: ['cityslickas', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    if (!!this.loginForm.valid) {
      this.loginService.authenticate(this.loginForm.value).subscribe(res => {
        if (res) {
          this.alertService.showSuccessAlert('login successful');
          this.router.navigateByUrl('/home');
          const headers = {
            accessToken: res.token
          };
          this.loginService.storeHeaders(headers);
          this.loginService.setTokenToLocalStorage(res.token);
        }
      }, (err) => {
        this.alertService.showErrorAlert(err.error.error);
        this.success = false;
      });
    }
  }

}
