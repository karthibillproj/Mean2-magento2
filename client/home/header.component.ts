import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChildNavComponent } from './child.nav';
import { CustomerService } from "../customer/services/customer.service";
import { Router } from "@angular/router";
import { LoginHelper } from "../customer/helper/login.helper";
import { NavService } from "../shared/services/menu.service";
import { CartService } from "../cart/services/cart.service";
import { Subscription } from 'rxjs/Subscription';
// import {} from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'header-app',
    templateUrl: 'header.component.html',
    providers: [NavService],
})


export class HeaderComponent {

    title = 'Navigation Menu';
    logo = "./public/images/logo.png";
    navMenu: any;
    abcd: string;
    minicartContent: Object = {};
    productImages : Object = {};
    subscription: Subscription;
    cutomerToken = localStorage.getItem('customer_token');

    constructor(private _router: Router,
        private _navService: NavService,
        private _customerService: CustomerService,
        private _loginHelper: LoginHelper,
        private _minicartService: CartService) { }

    ngOnInit() {
        this._navService.getNavigation()
            .subscribe(data => {
                this.navMenu = data;
            });

        //     this._minicartService.getCart(this.cutomerToken)
        //         .subscribe(data=> {
        //             this.minicartContent = data.cartContent;
        //            // console.log(this.minicartContent);
        //             this.cartLength = this.minicartContent['items'].length;
        //         })
        // }

        this._minicartService.getLists();
        this.subscription = this._minicartService.cartContent$.subscribe((data: any) => {
            if(data.length > 0)
            {
                this.minicartContent = data[1]['quoteTotals'];
                this.productImages = data[0]['arrayImage'];
            }
            console.log('get minicart content====');
            // console.log(this.minicartContent);
        });

    }

    doLogout() {
        this._customerService.logout(this.cutomerToken)
            .subscribe(response => {
                localStorage.removeItem('customer_token');
                console.log('clear cart items=====');
                this._minicartService.clearCart();
                this._router.navigate(['/']);
            },
            error => {
                console.error(error);
                alert(error);
            }

            )
    }

    menuchange(id: any) {
        this._router.navigate(['/category/id/' + id]);
    }

    isLogggedIn() {
        return this._loginHelper.isLogggedIn();
    }

    noClose(event: any) {
        event.stopPropagation();

    }

    displayEditButton(event: any, originalQty: any) {
        if (event.srcElement.value == originalQty) {
            event.srcElement.nextElementSibling.style.display = 'none';
        } else {
            event.srcElement.nextElementSibling.style.display = 'block';
        }
    }

    updateMiniCart(qty: any, productId: any) {
        this._minicartService.updateCart(this.cutomerToken, productId, qty)
            .subscribe((response: any) => {
                // if(response){
                //     this.cartContent = response.cartContent;
                // }
                // this.isLoaderActive = false;
            },
            error => {
                console.error(error);
                //this.isLoaderActive = false;
            }
            )
    }

    removeMiniCartItem(productId: any) {
        console.log(productId);
        this._minicartService.deleteCartItem(productId)
            .subscribe((response: any) => {
                // if(response){
                //     this.cartContent = response.cartContent;
                // }
                // this.isLoaderActive = false;
            },
            error => {
                console.error(error);
                //this.isLoaderActive = false;
            }
            )
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();

    }
}