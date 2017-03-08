import {Component,OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import { CustomerService } from "../../services/customer.service";
import { customerAccountInformation } from "../../customer.interface";
import { SharedService } from "../../../shared/services/shared.service";

@Component({
  moduleId:module.id,
  selector:'account',
  templateUrl:'dashboard.component.html',
  providers:[]
})

export class DashboardComponent implements OnInit{

  constructor(){ }
  
  
  ngOnInit(){
 
  }

}