import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/productlist.component';
import { RedirectComponent } from  './components/redirect.component';


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
     { path: 'category/page/:id', component: RedirectComponent },
    {
        path: 'category/id/:id', component: ProductListComponent
       
        // path: 'productlist',component: ProductListComponent,
    },
];

export const productlistRouting: ModuleWithProviders = RouterModule.forChild(routes);