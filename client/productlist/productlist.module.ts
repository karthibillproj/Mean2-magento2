/* root angular libraries */
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../common/common.module';
import { ProductModule } from '../product/product.module';


/* product list module components import i.e. filters,listing */
import { ProductListComponent }  from './components/productlist.component';
import { FilterComponent }  from './components/filter/filter.component';
import { ListComponent }  from './components/list/list.component';

import { productlistRouting } from './productlist.routing';
import { findPipeFilter } from './pipes/find.pipe';

import { ProductService } from "./services/product.service";
// import {Ng2SliderComponent} from 'ng2-slider-component/ng2-slider.component';
import { NouisliderModule } from 'ng2-nouislider';
import { RedirectComponent } from  './components/redirect.component';
// import { DefaultImage} from '../shared/directives/placeholder.directive';




@NgModule({
  imports:      [
                  CommonsModule,
                  productlistRouting,
                  NouisliderModule,
                  ProductModule
                ],
  exports:[],
  declarations: [
                  ProductListComponent,
                  FilterComponent,
                  ListComponent,
                  findPipeFilter,
                  RedirectComponent
                ],
  providers:    [ ProductService ]
})
export class ProductListModule { }