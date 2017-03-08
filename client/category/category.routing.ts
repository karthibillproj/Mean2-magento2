import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './components/category.component';
import { RedirectComponent } from './components/redirect.component';


const routes: Routes = [
    { path: 'category/page/:id', component: RedirectComponent },
    { path: 'category/id/:id', component: CategoryComponent }
];

export const categoryRouting: ModuleWithProviders = RouterModule.forChild(routes);