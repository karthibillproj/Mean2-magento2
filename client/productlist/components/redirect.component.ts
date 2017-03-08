import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'camps-fake',
  template: ''
})
export class RedirectComponent implements OnInit {

  constructor(private _router:Router,
              private _route:ActivatedRoute)
  { }

  ngOnInit() {
    let id:number = -1;
    this._route.params.forEach((params:any) => {
      id = +params['id'];
    });

    let link:any[] = ['/category/id', id];
    this._router.navigate(link);
  }

}