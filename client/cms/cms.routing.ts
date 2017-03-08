import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactusComponent }  from './components/contactus/contactus.component';
import { CmsComponent }  from './components/cms/cms.component';
import { NotfoundComponent }  from './components/notfound/notfound.component';

const routes: Routes = [

        { path: 'contact', component: ContactusComponent },
        { path: '404', component: NotfoundComponent },
        { path: ':identifier', component: CmsComponent }
       
];

export const cmsRouting: ModuleWithProviders = RouterModule.forChild(routes);