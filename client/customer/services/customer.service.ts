import {Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { CustomerRegister,CustomerLogin } from "../customer.interface";
import {Observable} from 'rxjs/Rx';
@Injectable()
export class CustomerService{

    constructor(private _http: Http){
    }

    /*customer login service*/
    login(customerCredentials: CustomerLogin){
        // console.log(JSON.stringify(customerCredentials));
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        return this._http.post(
                            'api/dataservice/login',
                            JSON.stringify(customerCredentials),
                            {headers:headers}
                            )
            .map(res=>res.json())
            .catch(this.handleError)
            ;
    }

    /*customer login service*/
    register(customerCredentials: CustomerRegister){
        // console.log(JSON.stringify(customerCredentials));
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        return this._http.post(
                            'api/dataservice/register',
                            JSON.stringify(customerCredentials),
                            {headers:headers}
                            )
            .map(res=>res.json())
            .catch(this.handleError)
            ;
    }

    /*customer logout service*/
    logout(customer_token: string){
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        headers.append('customer_token',customer_token);
                return this._http.get(
                            'api/dataservice/logout',
                            {headers:headers}
                            )
            .map(res=>res.json())
            .catch(this.handleError)
            ;
    }

    /*customer logout service*/
    account(customer_token: string){
        // console.log(JSON.stringify(customerCredentials));
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        headers.append('customer_token',customer_token)
        // console.log(customer_token);
        return this._http.get(
                            'api/dataservice/account',
                            {headers:headers}
                            )
            .map(res=>res.json())
            .catch(this.handleError)
            ;
    }

    handleError(error:Response){
        // console.log('aaa--');
        // console.log(error.json());
        return Observable.throw(error || "Server error")
    }

}