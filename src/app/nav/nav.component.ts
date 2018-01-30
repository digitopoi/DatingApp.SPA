import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private _authService: AuthService, private _alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this._authService.login(this.model).subscribe(data => {
      this._alertify.success('Logged in successfully');
    }, error => {
      this._alertify.error('Failed to login');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout() {
    this._authService.userToken = null;
    localStorage.removeItem('token');
    this._alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

}
