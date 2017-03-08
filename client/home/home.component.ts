import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
// declare var $:JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'home-app',
    templateUrl: 'home.component.html',
    providers: [HomeService]
})
export class HomeComponent implements OnInit{
    
    homeDetails : any;
    content : any={};
    homeCenterContentId : any;
    constructor(private _homeService: HomeService) {  }
    ngOnInit() { 
       this.homeCenterContentId = "home";
       this._homeService.getHomeContent(this.homeCenterContentId)
            .subscribe(data => {
                this.content = data;
                console.log(this.content);
            });

        //    this.carousels();
    }

    ngAfterViewInit(){
        setTimeout(function(){ this.carousels(); }, 1000);
        
    }
    /* carousels */

    carousels() {
        $("#get-inspired").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        stopOnHover: true,
        singleItem: true,
        afterInit: ''
        });
        $('.product-slider').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        afterInit: function() {
            $('.product-slider .item').css('visibility', 'visible');
        }
        });
        $('#main-slider').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        stopOnHover: true,
        singleItem: true,
        afterInit: ''
        });

    }
    

}