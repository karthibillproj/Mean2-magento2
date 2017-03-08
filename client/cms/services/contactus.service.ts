import {Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ContactusService{

    constructor(private _http: Http){

    }

    postContactus(contact:any){
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        
        return this._http.post(
                            'api/dataservice/contactus',
                            JSON.stringify(contact),
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
