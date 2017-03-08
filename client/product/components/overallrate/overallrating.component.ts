import { Component,Input } from '@angular/core';



@Component({
    moduleId: module.id,
    selector: 'overallrate',
    templateUrl: 'overallrating.html'
})
export class OverallratingComponent {

  @Input() starrate: any;
  items :number[] = [];
  private range: Array<number> = [1, 2, 3, 4, 5];

  constructor(){
    // console.log(this.childNav);
  }

   createRange(number :number){
        this.items = [];
        for(var i = 1; i <= number; i++){
            this.items.push(i);
        }
        return this.items;
    }

}