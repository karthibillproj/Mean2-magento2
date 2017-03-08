import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class NavService{
        constructor(private _http: Http){
    }

    getNavigation(){
        return this._http.get('api/dataservice/menu')
                    .map(res=>res.json())
            ;
    }
}