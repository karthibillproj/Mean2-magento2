import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../common/common.module';


/* customer module components import i.e. login,register */
import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';
import { DashboardComponent }  from './components/myaccount/dashboard.component';
import { AccountInfoComponent }  from './components/myaccount/accountinfo.component';
import {LoginHelper} from "./helper/login.helper";
import { CustomerService } from "./services/customer.service";
import { AccountNavComponent } from "./components/myaccount/account-nav/accountnav.component";
import { OrdersComponent }     from './components/myaccount/orders/orders.component';
import { HighlightDirective } from '../shared/directives/highlight.directive';

import { accountRouting } from './customer.routing';

@NgModule({
  imports:      [
                  CommonsModule,
                  accountRouting
                ],
  exports:[],
  declarations: [
                  LoginComponent,
                  RegisterComponent,
                  DashboardComponent,
                  AccountNavComponent,
                  HighlightDirective,
                  OrdersComponent,
                  AccountInfoComponent
                ],
  providers:    [ LoginHelper,
                  CustomerService
                ]
})
export class CustomerModule { }