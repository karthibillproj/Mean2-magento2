import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/helper/auth.guard';
import { CartComponent } from './components/cart.component';

const routes: Routes = [
     { path: 'cart', component: CartComponent,canActivate: [AuthGuard]}  
    //  { path: 'cart', component: CartComponent,canActivate: [AuthGuard] }  
];

export const cartRouting: ModuleWithProviders = RouterModule.forChild(routes);