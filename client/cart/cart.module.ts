/* root angular libraries */
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../common/common.module';


/* product list module components import i.e. filters,listing */
import { CartComponent }  from './components/cart.component';
import { cartRouting } from './cart.routing';




@NgModule({
  imports:      [
                  CommonsModule,
                  cartRouting
                ],
  exports:[],
  declarations: [
                  CartComponent
                ],
  providers:    [ ]
})
export class CartModule { }