import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginHelper} from "../../customer/helper/login.helper";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private _loginHelper: LoginHelper) {}

 canActivate() {
    if (this._loginHelper.isLogggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}