import { Component, AfterViewInit, OnInit, Renderer, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {CheckoutService} from "../../services/checkout.service";
import {CartService} from "../../../cart/services/cart.service";
import {Router} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'checkout',
    templateUrl: 'checkoutnew.html',
    providers:[CheckoutService,CartService],
})

export class CheckoutComponent  {

  public billingForm: FormGroup;
  public shippingForm: FormGroup;
  public shippingmethodForm: FormGroup;
  public paymentmethodForm: FormGroup;
  public orderReviewForm: FormGroup;
  isLoaderActive: boolean = false;
  mainloader: boolean = false;
  successmessage:string;
  errormessage:string;
  customer_token : string;
  email:string;
  cartitems: any[] = [];
  billingaddressobject:Object;
  shippingddressobject:Object;
  shippingmethodobject:Object;
  paymentmethodobject:Object;
  order:Object;

  disablebillingaddressclass: boolean = false;
  disableshipaddressclass: boolean = true;
  disableshippingmethodclass: boolean = true;
  diablepaymetmethodclass: boolean = true;

  activebillingaddressclass: boolean = true;
  activeshipaddressclass: boolean = false;
  activeshippingmethodclass: boolean = false;
  activepaymentmethodcalss: boolean = false;


  showbillingaddress: boolean = true;
  showshippingaddress: boolean = false;
  showshippingmethod: boolean = false;
  showpaymentmethod: boolean = false;

//   code changes from Sudip
 showAddress : boolean = false;
 showShippingMethod : boolean = false;
 showPaymentMethod : boolean = false;
 showOrderReview : boolean = false;
 cartContent : Object = {};
 cartItemImages : Object = {};
 subscription: Subscription;
 addressResponse : any;
 paymentResponse : Object = {};
 billingAddress : Object = {};
 paymentMethods : Object = {};
 isOrderSuccess : boolean = false;
 orderId : String = '';
//    End code changes form Sudip

  constructor(private _router: Router,private _cartService: CartService,private _checkoutservice: CheckoutService, private renderer:Renderer, private _fb: FormBuilder)
  {

  }

  ngOnInit() {  
          this.getcartitems();  
          this.createbillingForm();
          this.createshippingForm();
          this.createshippingmethodForm();
          this.createpaymentmethodForm();
          this.createOrderReviewForm();
   }

   getcartitems(){
       this.isLoaderActive = true;
       this.showAddress = true;
       this._cartService.getLists();
       this._cartService.cartContent$.subscribe((data: any) => {
            if(data.length > 0)
            {
                this.cartItemImages = data[0]['arrayImage'];
                this.cartContent = data[1]['quoteTotals'];
                this.isLoaderActive = false;
            }
        });
   }


   createbillingForm(){
      this.billingForm = this._fb.group({
            email: ['', Validators.compose([Validators.required, this.mailFormat])],
            firstname: ['', [<any>Validators.required]],
            lastname: ['', [<any>Validators.required]],
            street: ['', [<any>Validators.required]],
            city: ['', [<any>Validators.required]],
            company: ['',[]],
            region: ['', [<any>Validators.required]],
            postcode: ['', [<any>Validators.required]],
            country_id: ['', [<any>Validators.required]],
            telephone: ['',Validators.compose([Validators.required,this.phoneFormat])],
        });
   }

    createshippingForm(){
      this.shippingForm = this._fb.group({
            firstname: ['', [<any>Validators.required]],
            lastname: ['', [<any>Validators.required]],
            street: ['', [<any>Validators.required]],
            city: ['', [<any>Validators.required]],
            region: ['', [<any>Validators.required]],
            postcode: ['', [<any>Validators.required]],
            country_id: ['', [<any>Validators.required]],
            telephone: ['',Validators.compose([Validators.required,this.phoneFormat])],
        });
   }

   createshippingmethodForm(){
        this.shippingmethodForm = this._fb.group({
            shippingmethod: ['',[<any>Validators.required]],
        });
   }

    createpaymentmethodForm(){
        this.paymentmethodForm = this._fb.group({
            paymentmethod: ['',[<any>Validators.required]],
        });
   }

   createOrderReviewForm(){
        this.orderReviewForm = this._fb.group({
           // order: ['',[<any>Validators.required]],
        });
   }

    mailFormat(control: FormControl): any {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
      return { "incorrectMailFormat": true };
    }
    return null;
  }

    phoneFormat(control: FormControl): any {
    var PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (control.value != "" && (!PHONE_REGEXP.test(control.value))) {
      return { "incorrectPhoneFormat": true };
    }
    return null;
  }

   billingsave(billingAddress: any, isValid: boolean)
   {
       this.isLoaderActive = true;
       this.subscription = this._checkoutservice.saveBilling(billingAddress)
        .subscribe((response:any) =>
         {
            if(response.length > 0)
            {
                this.addressResponse = response;
                this.billingAddress =billingAddress;
                this.isLoaderActive = false;
                this.shippingMethodShow();
            }
        },
        error => {
            console.error(error);
            this.isLoaderActive = false;
        })
    }

    shippingsave(model: any, isValid: boolean){
        console.log(model);
        localStorage.setItem("shippingaddress", JSON.stringify(model));
        //this.shippingmethodshow();
    }

    shippingmethodsave(shippingMethod: any, isValid: boolean){
      this.isLoaderActive = true;
      this.subscription = this._checkoutservice.saveShippingMethod(shippingMethod,this.billingAddress)
        .subscribe((response:any) =>
         {
            this.isLoaderActive = false;
            if(response !== undefined)
            {
                this.cartContent = response['totals'];
                this.paymentResponse = response['paymentMethods'];
                this.isLoaderActive = false;
                this.paymentMethodShow();
            }
        },
        error => {
            console.error(error);
            this.isLoaderActive = false;
        })
    }

    paymentmethodsave(paymentMethod: any, isValid: boolean){
       this.isLoaderActive = true;
       this.paymentMethods = paymentMethod;
       if(this.paymentMethods !== undefined)
       {
           this.isLoaderActive = false;
           this.orderReviewShow();
       }
    }

    postOrder()
    {
        this.isLoaderActive = true;
        this.subscription = this._checkoutservice.postOrder(this.paymentMethods)
        .subscribe((response:any) =>
         {
            this.isLoaderActive = false;
            this.orderId = response;
            this.isOrderSuccess = true;
            this.isLoaderActive = false;
        },
        error => {
            console.error(error);
            this.isLoaderActive = false;
        })
    }

    placeorder(){
        this.isLoaderActive=true;
        this.billingaddressobject = JSON.parse(localStorage.getItem('billingaddress'));
        this.email = this.billingaddressobject['email'];
        delete this.billingaddressobject['email'];
        this.shippingddressobject = JSON.parse(localStorage.getItem('shippingaddress'));
        this.shippingmethodobject = JSON.parse(localStorage.getItem('shippingmethod'));
        this.paymentmethodobject = JSON.parse(localStorage.getItem('paymentmethod'));
        this.order = {
            "currency_id" : "USD",
            "email" : this.email,
            "billing_address" : this.billingaddressobject,
            "shipping_address" : this.shippingddressobject,
            "shipping_method" : this.shippingmethodobject['shippingmethod'],
            "payment_method" : this.paymentmethodobject['paymentmethod'],
            "items" : this.cartitems
        }

        this._checkoutservice.postOrder(this.order)
            .subscribe(
                data => {
                 console.log('success in posting');
                 this.isLoaderActive=false;
                },
                error => {
                console.log('error in posting');
                this.isLoaderActive=false;
                }
            ); 
          this._router.navigate(['/checkout/success']);
    }
  
   billingaddressshow(){
        this.activebillingaddressclass = true;
        this.activeshipaddressclass = false;
        this.activeshippingmethodclass = false;
        this.activepaymentmethodcalss = false;
        this.showbillingaddress = true;
        this.showshippingaddress = false;
        this.showshippingmethod = false;
        this.showpaymentmethod = false;
    }

    shippingaddressshow(){
        this.disableshipaddressclass = false;
        this.activebillingaddressclass = false;
        this.activeshipaddressclass = true;
        this.activeshippingmethodclass = false;
        this.activepaymentmethodcalss = false;
        this.showbillingaddress = false;
        this.showshippingaddress = true;
        this.showshippingmethod = false;
        this.showpaymentmethod = false;
    }

    addressShow(){
        this.showAddress = true;
        this.showShippingMethod = false;
        this.showPaymentMethod = false;
        this.showOrderReview = false;
    }

    shippingMethodShow(){
        this.showAddress = false;
        this.showShippingMethod = true;
        this.showPaymentMethod = false;
        this.showOrderReview = false;
    }

    paymentMethodShow(){
        this.showAddress = false;
        this.showShippingMethod = false;
        this.showPaymentMethod = true;
        this.showOrderReview = false;
    }

    orderReviewShow()
    {
        this.showAddress = false;
        this.showShippingMethod = false;
        this.showPaymentMethod = false;
        this.showOrderReview = true;
    }

    // shippingmethodshow(){
    //     this.disableshippingmethodclass = false;
    //     this.activebillingaddressclass = false;
    //     this.activeshipaddressclass = false;
    //     this.activeshippingmethodclass = true;
    //     this.activepaymentmethodcalss = false;
    //     this.showbillingaddress = false;
    //     this.showshippingaddress = false;
    //     this.showshippingmethod = true;
    //     this.showpaymentmethod = false;
    // }

    // paymentmethodshow(){
    //     this.diablepaymetmethodclass = false;
    //     this.activebillingaddressclass = false;
    //     this.activeshipaddressclass = false;
    //     this.activeshippingmethodclass = false;
    //     this.activepaymentmethodcalss = true;
    //     this.showbillingaddress = false;
    //     this.showshippingaddress = false;
    //     this.showshippingmethod = false;
    //     this.showpaymentmethod = true;
    // }

   ngAfterViewInit() {
//        $(document).ready(function() {
//     var navListItems = $('ul.setup-panel li a'),
//         allWells = $('.setup-content');

//     allWells.hide();

//     navListItems.click(function(e:any)
//     {  
//         e.preventDefault();
//         var $target = $($(this).attr('href')),
//             $item = $(this).closest('li');
        
//         if (!$item.hasClass('disabled')) {
//             navListItems.closest('li').removeClass('active');
//             $item.addClass('active');
//             allWells.hide();
//             $target.show();
//         }
//     });
    
//     $('ul.setup-panel li.active a').trigger('click');
    
//     $('#activate-step-2').on('click', function(e:any) {
//         $('ul.setup-panel li:eq(1)').removeClass('disabled');
//         $('ul.setup-panel li a[href="#step-2"]').trigger('click');
//     })
    
//     $('#activate-step-3').on('click', function(e:any) {
//         $('ul.setup-panel li:eq(2)').removeClass('disabled');
//         $('ul.setup-panel li a[href="#step-3"]').trigger('click');
//     })
    
//     $('#activate-step-4').on('click', function(e:any) {
//         $('ul.setup-panel li:eq(3)').removeClass('disabled');
//         $('ul.setup-panel li a[href="#step-4"]').trigger('click');
//     }) 
    
// });


   } 



}