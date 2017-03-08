import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
// import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { productRouting } from './product.routing'; 
import { CommonsModule } from '../common/common.module';
import {ProductdetailService} from "./services/productdetail.service";



/* customer module components import i.e. login,register */
import { ProductdetailComponent }  from './components/productdetail/productdetail.component';
import { ProductlistComponent }  from './components/productlist/productlist.component';
import { OverallratingComponent }  from './components/overallrate/overallrating.component';
import { QuickviewComponent }  from './components/quickview/quickview.component';

@NgModule({
  imports:      [ CommonsModule, productRouting],
  exports:[OverallratingComponent, QuickviewComponent],
  declarations: [
                  ProductdetailComponent,
                  ProductlistComponent,
                  OverallratingComponent,
                  QuickviewComponent
                ],
  providers:    [ProductdetailService]
})
export class ProductModule { }