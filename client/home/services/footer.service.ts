import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class FooterService{
        constructor(private _http: Http){
    }
    getFooter(footerId : any){
        return this._http.get('api/dataservice/cms?id='+footerId)
                    .map(res=>res.json());
    }
}