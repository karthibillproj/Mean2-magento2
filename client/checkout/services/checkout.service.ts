import {Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from 'rxjs/Rx';
import {CookieHelper} from "../../shared/helper/cookie.helper";

@Injectable()
export class CheckoutService{

    quoteId : any;
    billingAllAddress : Object = {};
    shippingAllMethods : Object = {};
    orderData : Object = {};

    constructor(private _http: Http,private _cookieHelper:CookieHelper){
        var quoteId = this._cookieHelper.getCookie('quote_id');
    }

    getcartitems(customer_token : string){
        var quoteId = this._cookieHelper.getCookie('quote_id');
        console.log('inside checkout servidce===');
        console.log(quoteId);
       
        if(quoteId !== undefined)
        {
            var headers = new Headers();
            headers.append('Content-Type','application/json')
            headers.append('customer_token',customer_token)
            return this._http.get(
                                'api/dataservice/cartmagento?quote_id='+quoteId,
                                {headers:headers}
                                )
                .map(res=>res.json())
                .catch(this.handleError)
                ;
        }
    }


    saveBilling(billingAddress:Object){
        billingAddress['same_as_billing'] = 1;
        var quoteId = this._cookieHelper.getCookie('quote_id');
        console.log('inside save billing servidce===');
        
        this.billingAllAddress['billing_data'] = billingAddress;
        this.billingAllAddress['quote_id'] = quoteId;
        console.log('inside service biling data====');
        console.log(this.billingAllAddress);
        // return;


        if(quoteId !== undefined)
        {
            var headers = new Headers();
            headers.append('Content-Type','application/json')
            let body = JSON.stringify(this.billingAllAddress);
            return this._http.post(
                                'api/dataservice/magentocartbilling',
                                body,
                                {headers:headers}
                                )
                .map(res=>res.json())
                .catch(this.handleError)
                ;
        }
    }

    saveShippingMethod(shippingMethod : String,billingAddress : Object){
        var quoteId = this._cookieHelper.getCookie('quote_id');
       
        this.shippingAllMethods['addressInformation'] = billingAddress;
        this.shippingAllMethods['shippingmethod'] = shippingMethod;
        this.shippingAllMethods['quote_id'] = quoteId;

        console.log('inside service shipping methods data====');
        console.log(this.shippingAllMethods);
        // return;


        if(quoteId !== undefined)
        {
            var headers = new Headers();
            headers.append('Content-Type','application/json')
            let body = JSON.stringify(this.shippingAllMethods);
            return this._http.post(
                                'api/dataservice/magentoshippinginformation',
                                body,
                                {headers:headers}
                                )
                .map(res=>res.json())
                .catch(this.handleError)
                ;
        }
    }
    getShippingMethods(shippingData:Object){
        console.log('inside save billing servidce===');
        
        this.shippingAllAddress['address'] = shippingData;
        console.log(this.shippingAllAddress);

        var headers = new Headers();
        headers.append('Content-Type','application/json')
        let body = JSON.stringify(this.shippingAllAddress);
        return this._http.post(
                            'api/dataservice/magentoshippingmethods',
                            body,
                            {headers:headers}
                            )
            .map(res=>res.json())
            .catch(this.handleError)
            ;
    }
    postOrder(paymentMethod:any){
        var headers = new Headers();
        var quoteId = this._cookieHelper.getCookie('quote_id');
       
        this.orderData['payment_method'] = paymentMethod;
        this.orderData['quote_id'] = quoteId;
        let body = JSON.stringify(this.orderData);
        headers.append('Content-Type','application/json');
        
        return this._http.post(
                            'api/dataservice/magentoorderplace',
                            body,
                            {headers:headers}
                            )
            .map(res=>res.json())
            .catch(this.handleError)
            ; 
    }
     handleError(error:Response){
        return Observable.throw(error || "Server error")
    }

 
}
