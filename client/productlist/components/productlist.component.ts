import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Http } from '@angular/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListInterface } from "../productlist.interface";
import { ProductService } from "../services/product.service";
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'product-list',
    templateUrl: 'productlist.component.html'
})
export class ProductListComponent implements OnInit {

    filters: Object;
    public someRange: number[] = [0, 1000];
    isLoaderActive: boolean = false;
    productList: ProductListInterface[] = [];
    categoryName: string;
    categoryDescription: string;
    paramsSub: any;
    sub: any;
    preSelectedFull: Object = {};

    /* price filter variables */
    // minprice: any = 0;
    // maxprice: any = 1000;
	priceObj: any;

    /* pagination variables */
    public totalItems: number = 1000;
    public currentPage: number = 1;
    public itemsPerPage: number;

    category_id: number;

    displayMode: string;
    categoryContent: Object;

    /* sortby variables */
    sortItems: Object[] = [];
    selectedSortItem: string;


    constructor(private _cdr: ChangeDetectorRef, private _router: Router, private _location: Location, private _http: Http, private _productService: ProductService, private _activatedRoute: ActivatedRoute) {

        // this._productService.filters()
        //     .subscribe((response) => {
        //         if (response) {
        //             this.filters = response.filters;
        //             // console.log(this.filters);
        //         }
        //     },
        //     error => {
        //         console.error(error);
        //     }
        //     );

    }

    ngOnInit() {

        // this.updateFiltersOnLoad();
        // console.log(this._activatedRoute.queryParams.);
        this.sub = this._activatedRoute.params.subscribe(params => {
            this.category_id = params['id']; // (+) converts string 'id' to a number

            // In a real app: dispatch action to load the details here.
        });
        let varr: any;
        this.paramsSub = this._activatedRoute.queryParams.subscribe(
            (param: any) => {
                _.forEach(param, (value, key) => this.preSelectedFull[key] = value);
            });
        if (this.preSelectedFull['maxprice'] || this.preSelectedFull['minprice']) {
            this.someRange[0] = this.preSelectedFull['minprice'];
            this.someRange[1] = this.preSelectedFull['maxprice'];
            //     this.minprice = this.preSelectedFull['minprice'];
        }

        if (this.preSelectedFull['page']) {
            this.currentPage = parseInt(this.preSelectedFull['page']);
        }

        if (this.preSelectedFull['sort']) {
            this.selectedSortItem = this.preSelectedFull['sort'];
        }
        // this.setPage(3);
        // this._cdr.detectChanges();
        let isFilterUse: boolean = false;


        this.getProductList();

    }

    updateFilterParent(filterObj: any): void {
        // console.log('in my');
        // console.log(this.preSelectedFull);
        if (filterObj.preSelected.length) {
            let filterCheckbox = (this.preSelectedFull[filterObj.filterName] ? this.preSelectedFull[filterObj.filterName] + ',' + filterObj.preSelected.join(',') : filterObj.preSelected.join(','));
            filterCheckbox = _.difference(_.uniq(_.split(filterCheckbox, ',', )), filterObj.unSelected).join(',');
            this.preSelectedFull[filterObj.filterName] = filterCheckbox;
        } else if (this.preSelectedFull[filterObj.filterName] && !filterObj.preSelected.length) {
            delete this.preSelectedFull[filterObj.filterName];
        }
        // console.log(this.preSelectedFull);
        let isFilterUse: boolean = true;
        this.getProductList(isFilterUse);
    }

    onPriceChange($event: any): void {
        this.preSelectedFull['minprice'] = $event[0];
        this.preSelectedFull['maxprice'] = $event[1];
        let isFilterUse: boolean = true;
        this.getProductList(isFilterUse);

    }

    getProductList(isFilterUse: boolean = false): void {

        // console.log(this.preSelectedFull);
        this.isLoaderActive = true;
        /* get product list data from get request with parameters */
        this._productService.list(this.preSelectedFull, this.category_id)
            .subscribe(response => {
                this.productList = response.products;
                this.displayMode = response.displayMode;
                this.categoryContent = response.categoryContent;
                this.isLoaderActive = false;
                this.filters = response.filters;
                console.log(response);
				this.priceObj = response.price;
                this.categoryName = response.categoryName;
                this.categoryDescription = response.categoryDescription;
                if(this.priceObj && (_.isEmpty(this.preSelectedFull) || !this.preSelectedFull['minprice'])){
					this.someRange[0] = this.priceObj.minprice;
					this.someRange[1] = this.priceObj.maxprice;
				}
                this.itemsPerPage = (parseInt(response.pageSize)>parseInt(response.totalproducts)?parseInt(response.totalproducts):parseInt(response.pageSize));
                console.log(this.itemsPerPage);
                this.totalItems = parseInt(response.totalproducts);
                this.sortItems = response.sortType;
                this.selectedSortItem = response.currentSorting;
                this._cdr.detectChanges();
                if (isFilterUse) {
                    this._router.navigate(['category/id', this.category_id], { queryParams: this.preSelectedFull });
                }
                // }
            },
            error => {
                console.error(error);
                this.isLoaderActive = false;
            }

            )
    }

    public pageChanged(event: any): void {
        // console.log('Page changed to: ' + event.page);
        // console.log('Number items per page: ' + event.itemsPerPage);
        this.preSelectedFull['page'] = event.page;
        let isFilterUse: boolean = true;
        this.getProductList(isFilterUse);

    }

    public setPage(pageNo: number): void {
        this.currentPage = pageNo;
    }

    doSort(event: any) {
        // console.log(event);
        this.preSelectedFull['sort'] = event.target.value;
        let isFilterUse: boolean = true;
        this.getProductList(isFilterUse);
    }
}
