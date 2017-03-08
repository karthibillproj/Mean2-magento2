import {Injectable} from "@angular/core";
import {CookieService} from 'angular2-cookie/core';

@Injectable()

export class CookieHelper{
    constructor(private _cookieService:CookieService) {}

    setCookie(key:string, value:string)
    {
        this._cookieService.put(key,value);     
    }

     getCookie(key: string){
        return this._cookieService.get(key);
     }

   removeCookie(key: string){
     this._cookieService.remove(key);
  }
}
