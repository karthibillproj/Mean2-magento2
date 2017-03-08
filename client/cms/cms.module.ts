import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
// import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { cmsRouting } from './cms.routing'; 
import { CommonsModule } from '../common/common.module';



/* customer module components import i.e. login,register */
import { ContactusComponent }  from './components/contactus/contactus.component';
import { CmsComponent }  from './components/cms/cms.component';
import { NotfoundComponent }  from './components/notfound/notfound.component';

@NgModule({
  imports:      [ CommonsModule, cmsRouting],
  exports: [],
  declarations: [
                  ContactusComponent,
                  NotfoundComponent,
                  CmsComponent
                ],
  providers:    []
})
export class CmsModule { }