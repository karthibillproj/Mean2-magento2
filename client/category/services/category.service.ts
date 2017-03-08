import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class CategoryService{
    constructor(private _http: Http){
    }

    getCategory(categoryId : any){

        console.log('inside service ====');
        console.log(categoryId);

        return this._http.get('api/dataservice/category?id='+categoryId)
                    .map(res=>res.json());
    }
}