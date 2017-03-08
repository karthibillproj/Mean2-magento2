import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class CategoryService{
    constructor(private _http: Http){
    }

    getCategory(){
        return this._http.get('api/dataservice/category')
                    .map(res=>res.json())
            ;
    }
}