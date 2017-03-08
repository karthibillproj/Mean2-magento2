import { NgModule } from '@angular/core';
import { CommonsModule } from '../common/common.module';

import { CategoryComponent }     from './components/category.component';
import { categoryRouting } from './category.routing';
import { RedirectComponent } from  './components/redirect.component'
// import { CategoryService } from "./services/category.service";

@NgModule({
    imports: [CommonsModule,categoryRouting],
    exports: [],
    declarations: [CategoryComponent,RedirectComponent],
    providers: [],
})
export class CategoryModule { }
