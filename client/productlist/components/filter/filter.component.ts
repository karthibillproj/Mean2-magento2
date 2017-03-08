import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { filterPreselect } from "../../productlist.interface";
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'product-filters',
    templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit {

    filters: Object;
    preSelected: Object[] = [];
    unSelected: Object[] = [];

    searchQuery: string;
    preArray: Object[] = [];

    /* input variables */
    @Input() filter: Object;
    @Input() filterName: any;
    @Input() singleSelect: boolean = false;
    @Input() preSelectedFromUrl: any;

    @Output() updateFilters = new EventEmitter();
    constructor(private _productService: ProductService) {
    }

    ngOnInit() {
        // console.log(this.preSelectedFromUrl);
        if (!_.isEmpty(this.preSelectedFromUrl)) {
            _.forEach(this.filter['options'], (value, key) => {
                if (this.preSelectedFromUrl.indexOf(value.value) != -1) {
                    this.filter['options'][key].selected = true;
                    this.preSelected.push(value.value);
                }
            });
        }
    }

    sendCheckbox($event: any) {
        this.unSelected = [];
        if ($event.target.checked == true) {
            // debugger;
            this.preSelected.push($event.target.value);
            // this.preSelected.push({"filter":selectedFilter,"value":$event.target.value});
        } else {
            this.unSelected = [$event.target.value];
            this.deleteByVal($event.target.value)
        }
        this.updateFilters.emit({ 'preSelected': this.preSelected, "filterName": this.filterName, 'unSelected': this.unSelected });
    }

    deleteByVal(val: any) {

        this.preSelected = this.preSelected.filter((value: any) => value != val);
    }
}

