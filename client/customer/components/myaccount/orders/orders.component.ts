import {Component,OnInit,ElementRef} from "@angular/core";
import {Http} from "@angular/http";

@Component({
  moduleId:module.id,
  selector:'account-orders',
  templateUrl:'orders.component.html',
  providers:[]
})

export class OrdersComponent implements OnInit{

  selectedTab: string;
  constructor(){ }
  
  
  ngOnInit(){
 
  }
  
}