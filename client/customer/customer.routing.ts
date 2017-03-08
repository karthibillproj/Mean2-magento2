import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/myaccount/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/myaccount/orders/orders.component';
import { AccountInfoComponent }  from './components/myaccount/accountinfo.component';
import { LoginComponent }     from './components/login/login.component';



// const routes: Routes = [

//   {
//     path: '', component: AccountInfoComponent,
//     children: [
//      { path: 'orders', component: AccountInfoComponent },
//      { path: 'variations', component: AccountInfoComponent }
//     ]
//   }
// ];

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'account',
        component: DashboardComponent,
        children: [
            { path: '', component:AccountInfoComponent },
            { path: 'orders', component: OrdersComponent }
        ]
    },
];

export const accountRouting: ModuleWithProviders = RouterModule.forChild(routes);