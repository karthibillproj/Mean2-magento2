import { Component, OnInit } from '@angular/core';
import {CmsService} from "../../services/cms.service";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cms',
    templateUrl: 'cms.html',
    providers:[CmsService],
})

export class CmsComponent  {

  content : any[] = [];

  constructor(private _cmsservice: CmsService, private route: ActivatedRoute){
    // console.log(this.childNav);
  }

   ngOnInit() {  
      this.route.params.forEach((params: Params) => {
      let id = params['identifier'];
       this.getContent(id);
    });
   }

   getContent(identifier : any){

       this._cmsservice.getContent(identifier)
          .subscribe(response => {
           this.content = response;
           console.log(response);
        },
        error => {
          console.log(error);
        });
   }

  

}