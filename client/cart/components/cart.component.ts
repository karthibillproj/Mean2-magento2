import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CookieHelper } from "../../shared/helper/cookie.helper";
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'cart',
    templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

    isShowUpdate: boolean = false;
    isLoaderActive: boolean = false;
    showOnUpdate: boolean = false;
    cartContent: Object = {};
    productImages: Object = {};
    cartdeleteproduct: Object = {};
    cutomerToken = localStorage.getItem('customer_token');
    cartproduct: Object = {};
    subscription: Subscription;
    coupon: FormGroup;
    couponResponse: any ={};

    constructor(private fb: FormBuilder, private _cartService: CartService, private _cookieHelper: CookieHelper) { }
    quote_id = this._cookieHelper.getCookie('quote_id');

    ngOnInit() {

        this.isLoaderActive = true;
        this._cartService.getLists();
        this.subscription = this._cartService.cartContent$.subscribe((data: any) => {
            if (data.length > 0) {
                this.cartContent = data[1]['quoteTotals'];
                this.productImages = data[0]['arrayImage'];
                this.isLoaderActive = false;
                this.coupon = this.fb.group({
                    couponname: [this.cartContent['couponCode'], Validators.required],
                });
            }

            console.log('get cart content====');
            console.log(data);
        });
    }

    updatecartsubmit(model: any) {
        console.log(model);
    }

    applyCoupon(isDelete: any=0) {
        this.isLoaderActive = true;
        this.showOnUpdate = true;
        var couponData = this.coupon.value;
         this._cartService.ApplyCoupon(couponData,isDelete)
          .subscribe(response => {
          this.isLoaderActive=false;
          this.showOnUpdate = false;
          this.couponResponse['isValid'] = response.success;
          if((this.couponResponse['isValid'] === true) && response.isRemoved === false){
            this.couponResponse['message'] = "Coupon applied successfully!";
            this._cartService.getLists();
          }else if((this.couponResponse['isValid'] === true) && response.isRemoved === true){
            this.couponResponse['message'] = "Coupon removed successfully!";
            this._cartService.getLists();
          }else{
              this.couponResponse['message'] = "Invalid coupon code!";
          }
          console.log(this.couponResponse);          
        },
        error => {
        //   this.anyError=error;
          console.error(error);
          this.isLoaderActive=false;
          this.showOnUpdate = false;
        });
    }

    updateShow(event: any, originalQty: Number) {

        if (event.target.value == originalQty) {
            event.target.nextElementSibling.style.display = 'none';
        } else {
            event.target.nextElementSibling.style.display = 'inline-block';
        }
        // event.srcElement.nextElementSibling.style.display = "";
        // this.isShowUpdate = true;
    }

    updateCart(qty: number, itemId: number) {
        this.showOnUpdate = true;
        this.isLoaderActive = true;

        this.cartproduct = {
            "itemId": itemId,
            "qty": qty,
            "productType": 'simple',
            "quote_id": this.quote_id
        }

        this.subscription = this._cartService.updateCart(this.cartproduct)
            .subscribe((response: any) => {
                console.log('after update cart product response======');
                console.log(response);
                /* if(response){
                    this.cartContent = response.cartContent;
                } */
                if (response == true) {
                    this._cartService.getLists();
                }
                this.isLoaderActive = false;
                this.showOnUpdate = false;
            },
            error => {
                console.error(error);
                this.isLoaderActive = false;
            })
    }

    removeCartItem(itemId: any) {
        // console.log(itemId);
        // console.log(this.quote_id);
        this.showOnUpdate = true;
        this.isLoaderActive = true;
        this._cartService.deleteCartItem(itemId)
            .subscribe((response) => {
                console.log('del response from api ===');
                console.log(response);
                if (response == true) {
                    this._cartService.getLists();
                    this.isLoaderActive = false;
                    this.showOnUpdate = false;
                }

            },
            error => {
                this.isLoaderActive = false;
                this.showOnUpdate = false;
                console.error(error);
            }
            )
    }

}
