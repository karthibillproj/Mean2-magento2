import { Component, OnInit, ViewChild,Input } from '@angular/core';
// import { ProductService } from "../../services/product.service";
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { ProductdetailService  } from "../../../product/services/productdetail.service";
import { Productdetail } from '../../../product/product.interface';
import { QuickviewComponent }  from '../../../product/components/quickview/quickview.component';
import { OverallratingComponent }  from '../../../product/components/overallrate/overallrating.component';


@Component({
    moduleId: module.id,
    selector: 'product-listing',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {

    gridCheck: boolean = false;
    // productList: ProductListInterface[]=[];
    currentProduct: Productdetail[] = [];
    @Input() productList: any
    @ViewChild('modal') modal:ModalComponent;

    constructor(private _productdetailService: ProductdetailService) {

        // this.isLoaderActive = true;
        // /* get product list data from get request with parameters */
        // var cutomerToken = localStorage.getItem('customer_token');
        // this._productService.list(cutomerToken)
        //     .subscribe(response => {
        //         this.productList = response.products;
        //         this.isLoaderActive = false;
        //     },
        //     error => {
        //         console.error(error);
        //         this.isLoaderActive = false;
        //     }

        //     )
    }

    ngOnInit() {
       
     }

    toggleClass(val: string) {
        if (val == 'grid') {
            this.gridCheck = false;
        } else if (val == 'list') {
            this.gridCheck = true;
        }
    }

    openQuickview(productSku: string) {
        // this.currentProduct = productId;
        this._productdetailService.getProduct(productSku).subscribe(
            (data: Productdetail[]) => {
                this.currentProduct = data;
            }
        )
        this.modal.open();
    }

    imgError(e: any){
        console.log(e);
    }
}