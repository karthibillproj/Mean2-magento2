import {Component,OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {FormBuilder,Validators,FormGroup,FormControl} from "@angular/forms";
import { CustomerLogin } from "../../customer.interface";
import { CustomerService } from "../../services/customer.service";
// import { Contro} from '@angular/common';
import { SharedService } from "../../../shared/services/shared.service";


@Component({
  moduleId:module.id,
  selector:'login',
  templateUrl:'login.component.html',
  styleUrls:['login.component.css'],
  providers:[]
})

export class LoginComponent implements OnInit{

  customer: FormGroup;
  anyError: any;
  isLoaderActive: boolean = false;
  // mailAddress: Control;
  
  constructor(
                private _http: Http,
                private fb: FormBuilder,
                private _router: Router,
                private _customerService: CustomerService,
                private _sharedService: SharedService
                ){ }

  ngOnInit(){
     this.customer = this.fb.group({
        username:["",Validators.compose([Validators.required,this.mailFormat])],
        password:["",Validators.required]
    });
  }

  doLogin(){
    this.isLoaderActive=true;
    var loginCredentials = this.customer.value;
    this._customerService.login(loginCredentials)
          .subscribe(response => {
          localStorage.setItem('customer_token', response);
          this.isLoaderActive=false;
          this._sharedService.loginSuccessful = true;
          this._router.navigate(['/account']);
        },
        error => {
          this.anyError=error;
          console.error(error);
          this.isLoaderActive=false;
        });
  }



  /*Method for email validation*/
   mailFormat(control: FormControl): any {
      var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
          return { "incorrectMailFormat": true };
      }
      return null;
  }

}