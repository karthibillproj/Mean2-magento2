import { Component,Input } from '@angular/core';



@Component({
    moduleId: module.id,
    selector: '[child-nav]',
    templateUrl: 'child.nav.html'
})
export class ChildNavComponent {

  @Input() subnav: any;

  constructor(){
    // console.log(this.childNav);
  }
}