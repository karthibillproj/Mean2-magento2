import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
// import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { checkoutRouting } from './checkout.routing'; 
import { CommonsModule } from '../common/common.module';



/* customer module components import i.e. login,register */
import { CheckoutComponent }  from './components/checkout/checkout.component';
import { CheckoutsuccessComponent }  from './components/success/checkoutsuccess.component';

@NgModule({
  imports:      [ CommonsModule, checkoutRouting],
  exports: [],
  declarations: [
                  CheckoutComponent,
                  CheckoutsuccessComponent
                ],
  providers:    []
})
export class CheckoutModule { }