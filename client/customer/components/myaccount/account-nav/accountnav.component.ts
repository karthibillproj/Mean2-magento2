import {Component,OnInit,ElementRef} from "@angular/core";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  moduleId:module.id,
  selector:'account-nav',
  templateUrl:'accountnav.component.html',
  providers:[]
})

export class AccountNavComponent implements OnInit{

  selectedTab: string;
  constructor(){ }
  
  
  ngOnInit(){
 
  }
  selectedTabChange(tab: string){
    this.selectedTab= tab;
  }

}