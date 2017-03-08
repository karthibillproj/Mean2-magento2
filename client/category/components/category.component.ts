import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
// import { CategoryDetails } from '../shared/interfaces';
import { ActivatedRoute,Params } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'category-app',
    templateUrl: 'category.component.html',
    providers: [CategoryService]
})
export class CategoryComponent {

    title = 'Category Landing Page';
    catDetails : any;
   // catDetails: CategoryDetails[] = [];
    categoryId : number;

    //categoryId: number = 21;
    
    constructor(private _categoryService: CategoryService, private _route: ActivatedRoute) {  }

    ngOnInit() { 
        if(this._route.snapshot.params['id']){
            this.categoryId = this._route.snapshot.params['id'];
        }
        console.log('get Id from parameter=====');
        console.log(this.categoryId);

        this._categoryService.getCategory(this.categoryId)
            .subscribe((data) => this.catDetails = data);
    }

}