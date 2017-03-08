import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { app_routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

//import { DataService } from './shared/services/data.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header.component';
import { FooterComponent } from './home/footer.component';
import { ChildNavComponent } from './home/child.nav';
import { CustomerModule } from './customer/customer.module';
// import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductListModule } from './productlist/productlist.module';
import { CmsModule } from './cms/cms.module';
import { CheckoutModule } from './checkout/checkout.module';
import { AuthGuard } from './shared/helper/auth.guard';
// import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
// import {LoginHelper} from "./shared/helper/login.helper";
// import { LoginService } from "./shared/services/customer.service";
import { SharedService } from "./shared/services/shared.service";
import { CommonsModule } from './common/common.module';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/services/cart.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieHelper} from './shared/helper/cookie.helper';


import { DropdownModule } from "ng2-dropdown";

const app_modules: any = [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  app_routing,
  ProductModule,
  // CategoryModule,
  CustomerModule, //customer module includes customer pages,login,register,etc
  ProductListModule, //product list display modue
  CommonsModule,
  DropdownModule,
  CheckoutModule,
  CartModule
];

@NgModule({
  imports: [
    ...app_modules,
    CmsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ChildNavComponent
  ],
  providers: [
    AuthGuard,
    SharedService,
    CartService,
    CookieService,
    CookieHelper,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
