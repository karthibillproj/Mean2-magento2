import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductdetailComponent }  from './components/productdetail/productdetail.component';
import { ProductlistComponent }  from './components/productlist/productlist.component';

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

        { path: 'products', component: ProductlistComponent },
        { path: 'product/:sku', component: ProductdetailComponent }
];

export const productRouting: ModuleWithProviders = RouterModule.forChild(routes);