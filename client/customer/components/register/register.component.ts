import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { CustomerRegister } from "../../customer.interface";
import { CustomerService } from "../../services/customer.service";
// import { Contro} from '@angular/common';


@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: []
})

export class RegisterComponent implements OnInit {

  customer: FormGroup;
  // mailAddress: Control;
    anyError: any;
   isLoaderActive: boolean = false;

  constructor(private _http: Http, private fb: FormBuilder, private _router: Router, private _customerService: CustomerService) { }

  ngOnInit() {
    this.customer = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, this.mailFormat])],
      'passwords': this.fb.group({
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      }, { validator: this.specialValidator })
    });
  }

  doRegister() {
    this.isLoaderActive=true;
    var registerCredentials = this.customer.value;
    this._customerService.register(registerCredentials)
      .subscribe(response => {
        localStorage.setItem('customer_token', response);
        this._router.navigate(['/account']);
        this.isLoaderActive=false;
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

  /*method for confirm password*/
  specialValidator(g: FormGroup) {
    return g.get('password').value != '' && g.get('password').value != g.get('confirmpassword').value ? { 'incorrectPassword': true } : null;
  }

}