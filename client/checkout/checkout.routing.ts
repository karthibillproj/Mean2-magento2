import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckoutComponent }  from './components/checkout/checkout.component';
import { CheckoutsuccessComponent }  from './components/success/checkoutsuccess.component';
import { AuthGuard } from '../shared/helper/auth.guard';

const routes: Routes = [

        { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
        { path: 'checkout/success', component: CheckoutsuccessComponent, canActivate: [AuthGuard] }
];

export const checkoutRouting: ModuleWithProviders = RouterModule.forChild(routes);