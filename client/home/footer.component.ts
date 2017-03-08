import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FooterService } from './services/footer.service';

@Component({
    moduleId: module.id,
    selector: 'footer-app',
    templateUrl : 'footer.component.html',
    providers:[FooterService],
})


export class FooterComponent {
    
    title = 'Footer';
    footerHtml : any;
    footerContent: any ;
    footerId : any;
    constructor(private _router: Router,private _footerService: FooterService) {  }

    ngOnInit() { 
        this.footerId = 'footer';
        this._footerService.getFooter(this.footerId)
            .subscribe(data => {
                console.log('footer data=====');
                // console.log(data);
                this.footerHtml = data;
                this.footerContent = this.footerHtml.content;
            });
    }
    
}