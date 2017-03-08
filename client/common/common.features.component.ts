
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'common-feature',
    templateUrl: 'common.features.component.html'
})
export class CommonFeatureComponent implements OnInit {
    constructor() { }

    ngOnInit() { }


    /*ng2-accordion*/
    public items: string[] = ['Item 1', 'Item 2', 'Item 3'];
     
 

    public status: Object = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    public groups: any[] = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    public addItem(): void {
        this.items.push(`Items ${this.items.length + 1}`);
    }

    public totalItems: number = 64;
  public currentPage: number = 3;
 
  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }
 
  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

}