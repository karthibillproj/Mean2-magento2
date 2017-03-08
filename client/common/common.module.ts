import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonFeatureComponent } from './common.features.component';
// import { MdSliderModule } from '@angular2-material/slider';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
// import { MaterialModule } from '@angular/material';
import { DefaultImage } from '../shared/directives/placeholder.directive';


@NgModule({
  imports: [
    Ng2BootstrapModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpModule,
    Ng2Bs3ModalModule,
  ],
  exports: [
    Ng2BootstrapModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    Ng2Bs3ModalModule,
    CommonFeatureComponent,
    DefaultImage
  ],
  declarations: [
    CommonFeatureComponent,
    DefaultImage

  ],
  providers: [
  ]
})
export class CommonsModule {

}