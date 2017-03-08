import {Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CmsService{

    constructor(private _http: Http){

    }

     getContent(identifier : any){
        // return this._http.get('http://localhost/api/'+identifier+'.json').map(res => {
        //   return res.json()
        // }).catch(this.handleError);
       return this._http.get('api/dataservice/cms?id='+identifier).map((res) => res.json());
    }

     handleError(error:Response){
        return Observable.throw(error || "Server error")
    }
 
}
