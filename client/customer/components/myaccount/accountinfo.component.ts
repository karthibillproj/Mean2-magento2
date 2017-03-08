import {Component,OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import { CustomerService } from "../../services/customer.service";
import { customerAccountInformation } from "../../customer.interface";
import { SharedService } from "../../../shared/services/shared.service";

@Component({
  moduleId:module.id,
  selector:'account-info',
  templateUrl:'accountinfo.component.html',
  providers:[]
})

export class AccountInfoComponent implements OnInit{

  customerData: customerAccountInformation[] = [];
  isLoaderActive: boolean = false;
  loginSuccessful: boolean = false;

  constructor(
              private _http: Http,
              private _customerService: CustomerService,
              private _sharedService: SharedService
              ){
    this.isLoaderActive=true;
    var cutomerToken = localStorage.getItem('customer_token');
    this._customerService.account(cutomerToken)
          .subscribe(response => {
          this.customerData = response;
          // console.log(this.customerData);
          this.isLoaderActive=false;
          this.loginSuccessful = this._sharedService.loginSuccessful;
          this._sharedService.loginSuccessful = false;
        },
        error => {
          console.error(error);
          this.isLoaderActive=false;
        }
        
        )
   }
  
  
  ngOnInit(){
 
  }

}