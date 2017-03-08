import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent }     from './customer/components/register/register.component';
import { HomeComponent }     from './home/home.component';
import { AccountInfoComponent }  from './customer/components/myaccount/accountinfo.component';
import { AuthGuard } from './shared/helper/auth.guard';
import { CommonFeatureComponent } from './common/common.features.component';
import { CustomerModule} from './customer/customer.module';


const app_routes: Routes = [
  { path: '',  component: HomeComponent }
  
  // { path: 'account', component: AccountInfoComponent, canActivate: [AuthGuard] },
  // { path: 'account', loadChildren: 'customer/customer.module#CustomerModule' },

  //{ path: 'features', component: CommonFeatureComponent },
];

export const app_routing = RouterModule.forRoot(app_routes);