import {Component,  AfterViewInit, OnInit} from "@angular/core";
import {ProductdetailService} from "../../services/productdetail.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Rating,Productdetail,Ratingmodel } from '../../product.interface';
import {LoginHelper} from "../../../customer/helper/login.helper";
import { OverallratingComponent }  from '../overallrate/overallrating.component';
import { QuickviewComponent }  from '../quickview/quickview.component';
declare var $:any;



@Component({
    moduleId: module.id,
    selector:'productdetail',
    templateUrl:"productdetail.component.html",
    providers:[],
})

export class ProductdetailComponent implements OnInit, AfterViewInit { 
  //  product: Productdetail;
    product: Productdetail[] = [];
    productsku : string;
    productimage: string;
    public ratingForm: FormGroup;
    items :number[] = [];
    isLoaderActive: boolean = false;
    isdescription: boolean = true;
    ismoreinfo: boolean = false;
    isreview: boolean = false;
    ssd :any;
    private range: Array<number> = [1, 2, 3, 4, 5];
    private rate: number;
  
  // ratingmodel = new Ratingmodel('', '', '', '');


   /*  name: string;
    price: string;
    sku: string;
    image: string;
    description: string;
    */

    constructor(private _productdetailservice: ProductdetailService, private route: ActivatedRoute, private _fb: FormBuilder,
 private router: Router, private _loginHelper: LoginHelper){
       this.productsku =  this.route.snapshot.params['sku'];
     
              /* 
              .subscribe(
               product => {
                this.product = product;
                this.name = this.product.name;
                this.price = this.product.price;
                this.sku = this.product.sku;
                this.productimage = this.product.productimage;
                this.description = this.product.description; 
            }) */
          
      /*   this.product = this._productdetailservice.getProduct(this.productsku);
         this.name = this.product.name;
         this.price = this.product.price;
         this.sku = this.product.sku;
         this.productimage = this.product.productimage;
         this.description = this.product.description;  */     
    }

    createRange(number :number){
        this.items = [];
        for(var i = 1; i <= number; i++){
            this.items.push(i);
        }
        return this.items;
    }

     ngOnInit() {
         this.isLoaderActive=true;
         this.ratingForm = this._fb.group({
            ratingvalue: ['', [<any>Validators.required]],
            productId: [''],
            customerId: [''],
            nickName: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
            title: ['', [<any>Validators.required]],
            detail: ['', [<any>Validators.required]],
        });


          this._productdetailservice.getProduct(this.productsku)
            .subscribe(
            (data: Productdetail[]) => { this.product = data; 
                 this.ratingForm.patchValue({
                     productId: this.product['productid'], 
                 });
                 this.isLoaderActive=false;   
                 console.log(this.product);              
            }); 

            if(this._loginHelper.isLogggedIn()){
                var customerId = localStorage.getItem('customer_token'); 
            }else{
                var customerId = '';
            }
               this.ratingForm.patchValue({
                     customerId: customerId, 
              });
          
    }

    setProductimage(thumbnail: any){
        this.productimage = thumbnail;
    }

    updatestar(value: any) {
         this.rate = value;
        this.ratingForm.patchValue({
            ratingvalue: value, 
        });
     }

     submitform(model: any) {
      console.log(model);
     }

     starclick(){
         console.log('dddd');
     }

     ratingsave(model: Rating, isValid: boolean) {
        console.log( this.ratingForm.value);
          this._productdetailservice.postRating(model)
           .subscribe(
            data => {
               console.log('success in posting')
            },
            error => {
               console.log('error in posting')
            }
            ); 
    }

    reviewtab(){
        this.isdescription = false;
        this.ismoreinfo = false;
        this.isreview = true;
    }

    descriptiontab(){
        this.isdescription = true;
        this.ismoreinfo = false;
        this.isreview = false;
    }

    moreinfotab(){
        this.isdescription = false;
        this.ismoreinfo = true;
        this.isreview = false;
    }

     

    ngAfterViewInit() {
         $("#starrating").rating({min:1, max:5, stop: 5,
         step: 1});
        // var val = $("#overallrspan").text();
        // console.log(this.product)
        //  $("#ovarallrate").val(this.product.overallrating);
         // $("#ovarallrate").rating();
    

    //     $('#starrating').on('rating.change', function(event, value, caption) {
    //       //  $('#ratingvalue').val(value);
    //       console.log(value);
    //        var input = $('#ratingvalue');
    //        input.val('value');
    //        input.trigger('input');

    //    /* this._fb.controls['nickname']
    //          .setValue(value); */
    //      });

    } 

}