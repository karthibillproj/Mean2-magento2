import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import "rxjs/add/operator/map";
import { CookieHelper } from "../../shared/helper/cookie.helper";


@Injectable()
export class CartService {

    listEvent: EventEmitter<any> = new EventEmitter();
    public cartContent = new BehaviorSubject({});
    cartContent$ = this.cartContent.asObservable();
    quote_id: any;
    isLoaderActive: boolean = false;
    emptyCartObj: Object = {};

    constructor(private _http: Http, private _cookieHelper: CookieHelper) {
        this.quote_id = this._cookieHelper.getCookie('quote_id');
    }

    // getCart() {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this._http.get(
    //         'api/dataservice/cartmagento?quote_id='+this.quote_id,
    //         { headers: headers }
    //     ).map(res => res.json())
    //         .catch(this.handleError);
    // }

    handleError(error: Response) {
        return Observable.throw(error || "Server error")
    }


    updateCart(product: any) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json')
        let body = JSON.stringify(product);
        return this._http.post(
            '/api/dataservice/cartmagentoupdate/',
            body,
            { headers: headers }
        ).map((res) => res.json())
            .catch(this.handleError);

        /* var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('customer_token', customer_token);
        headers.append('product_id', productId);
        headers.append('product_qty', qty);
        return this._http.get(
            //     Call API URL to Update Cart Item,
            //    'testjson/cart.json',
            'api/dataservice/cart',
            { headers: headers }
        ).map(res => res.json())
            .catch(this.handleError); */
    }

    ApplyCoupon(couponData: any,isDelete: number) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body: Object = {};
        let apiUrl = '';
        if(isDelete){
           apiUrl =  '/api/dataservice/deletecouponmagento/';
        }else{
            apiUrl =  '/api/dataservice/couponmagento/';
            body = couponData;
        }
        body['quote_id'] = this.quote_id;
        // let body = couponData;
        console.log(body);
        console.log(apiUrl);
        return this._http.post(
            apiUrl,
            JSON.stringify(body),
            { headers: headers }
        ).map((res) => res.json())
            .catch(this.handleError);

    }

    deleteCartItem(itemId: String) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(
            'api/dataservice/cartmagentodelete?item_id=' + itemId + '&quote_id=' + this.quote_id,
            { headers: headers }
        ).map(res => res.json())
            .catch(this.handleError);
    }

    getLists() {
        this.isLoaderActive = true;
        var headers = new Headers();
        var quoteId = this._cookieHelper.getCookie('quote_id');

        if (quoteId !== undefined) {
            console.log('quoteaaId====');
            console.log(quoteId);

            headers.append('Content-Type', 'application/json');
            return this._http.get(
                'api/dataservice/cartmagento?quote_id=' + quoteId,
                { headers: headers }
            ).map(res => res.json())
                .catch(this.handleError)
                .subscribe(
                (res) => {
                    this.isLoaderActive = false;
                    this.cartContent.next(res);
                },
                error => {
                    console.log('error in gettting minicart content');
                    console.log(error);
                }
                );
        }

    }

    clearCart() {
        console.log('initialize remove cart ===');
        this._cookieHelper.removeCookie('quote_id');
        this.cartContent.next({});
    }



}