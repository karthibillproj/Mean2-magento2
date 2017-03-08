import {Injectable} from "@angular/core";
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ProductdetailService{
 products = [
    {
  "id": 1,
  "sku": "24-MB01",
  "name": "Joust Duffle Bag",
  "price": "34",
  "productimage":"http://localhost/magento212ce/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/w/b/wb04-blue-0.jpg",
  "description":"sample description"
},
    {
  "id": 1,
  "sku": "MT07",
  "name": "Argus All-Weather Tank",
  "price": "22",
  "productimage":"http://localhost/magento212ce/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/m/t/mt07-gray_main.jpg",
  "description":"sample description"
},
    {
  "id": 1,
  "sku": "MH07",
  "name": "Hero Hoodie",
  "price": "54",
  "productimage":"http://localhost/magento212ce/pub/media/catalog/product/cache/1/image/700x560/e9c3970ab036de70892d86c6d221abfe/m/h/mh07-gray_main.jpg",
  "description":"sample description"
},
  ];
  

    constructor(private _http: Http){

    }
    getProduct(productsku : any){
      //  return this._http.get('/api/todos').map(res=>res.json());
        // return this._http.get('/product.json?sk='+productsku).map((res:Response) => res.json());
        // return this._http.get('http://localhost/api/product-detail.json').map((res) => res.json());
        return this._http.get('/api/dataservice/products/'+productsku).map((res) => res.json());
    }

    postRating(rating:any){
        //let headers = new Headers({'Content-Type': 'application/json'});
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        let body = JSON.stringify(rating);
       return this._http.post('/api/dataservice/review/', body, {headers:headers}).map((res) => res.json());
    }

    addtocart(product:any){
        var headers = new Headers();
        headers.append('Content-Type','application/json')
        let body = JSON.stringify(product);
       return this._http.post('/api/dataservice/magentocartcustomer/', body, {headers:headers}).map((res) => res.json());
    }
     bgetProduct(productsku : any){
         return this.products.find(product => product.sku == productsku);
    }
}
