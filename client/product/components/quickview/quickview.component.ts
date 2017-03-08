import { Component,Input, ViewChild } from '@angular/core';
import {ProductdetailService} from "../../services/productdetail.service";
import {LoginHelper} from "../../../customer/helper/login.helper";
import { ActivatedRoute,Router } from '@angular/router';
import { Inventory } from '../../product.interface';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { CartService } from "../../../cart/services/cart.service";
import {CookieHelper} from "../../../shared/helper/cookie.helper";

@Component({
    moduleId: module.id,
    selector: 'quickview',
    templateUrl: 'quickview.html'
})
export class QuickviewComponent {

  @Input() product: any;
  inv = new Inventory(1);
  cartproduct:Object;
  minicartContent : any;
  cartLength : number;
  quote_id : String = '';
  isLoaderActive: boolean = false;
  @ViewChild('modal') modal:ModalComponent;

  constructor( 
          private _minicartService: CartService,
          private _productdetailservice: ProductdetailService,
          private _router: Router, 
          private _loginHelper: LoginHelper,
          private _cookieHelper:CookieHelper){ }

  setProductimage(thumbnail: any){
        this.product.image = thumbnail;
  }

  addToCart(product_id:any,product_sku:string,product_price:any,quantity:number){

      
      this.isLoaderActive=true;
      
      if(this._cookieHelper.getCookie('quote_id'))
      {
        this.quote_id = this._cookieHelper.getCookie('quote_id');
      }
      
      if(this._loginHelper.isLogggedIn()){
        this.cartproduct = {
            "customer_id": localStorage.getItem('customer_token'),
            "product_sku": product_sku,
            "product_qty":quantity,
            "quote_id": this.quote_id
        }
        // console.log('cart product details====');
        // console.log(this.cartproduct);
        // return;
       this._productdetailservice.addtocart(this.cartproduct)
                .subscribe(
                    data => {
                      // Set quote Id in angular session
                      console.log('after adding to cart=====');
                      console.log(data);
                      // return;
                      if(data.length !== 'undefined' && data.length !== '')
                      {
                        this._cookieHelper.setCookie('quote_id',data.quoteId);
                        this._minicartService.getLists();
                        this.modal.open();
                      }
                      console.log('after adding to cart get quote id===');
                      console.log(this._cookieHelper.getCookie('quote_id'));
                      
                      if(data.status == 200){
                        // this._minicartService.getLists();
                        // this.modal.open();
                      }
                      this.isLoaderActive=false;
                    },
                    error => {
                    console.log('error in posting');
                    this.isLoaderActive=false;
                    console.log(error);
                    }
                );
      
      }else{
         this._router.navigate(['/login']);
      }
  }

}