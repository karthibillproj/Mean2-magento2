import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { ProductListInterface } from "../productlist.interface";
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';


@Injectable()
export class ProductService {


    constructor(private _http: Http) {
    }

    /*product list service*/
    list(params: Object, categoryId: any) {
        // para
        let url = '';
        if (!_.isEmpty(params)) {
            url = '?' + Object.keys(params).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
            }).join('&');
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(
            'api/dataservice/category/' + categoryId + url,
            // 'testjson/productlist.1.json'+url
            { headers: headers }
        )
            .map(res => res.json())
            .catch(this.handleError)
            ;
    }

    handleError(error: Response) {
        return Observable.throw(error || "Server error")
    }

}