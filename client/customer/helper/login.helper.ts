import {Injectable} from "@angular/core";

@Injectable()
export class LoginHelper {
   constructor() { }

   isLogggedIn(){
        if(localStorage.getItem('customer_token')){
            return true;
        }else{
            return false;
        }
    }

}