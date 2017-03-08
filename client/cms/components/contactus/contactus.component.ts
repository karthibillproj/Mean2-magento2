import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Contact } from '../../cms.interface';
import {ContactusService} from "../../services/contactus.service";

@Component({
    moduleId: module.id,
    selector: 'contactus',
    templateUrl: 'contactus.html',
    providers:[ContactusService],
})

export class ContactusComponent  {

  public contactForm: FormGroup;
  isLoaderActive: boolean = false;
  successmessage:string;
  errormessage:string;

  constructor(private _contactusservice: ContactusService, private _fb: FormBuilder){
    // console.log(this.childNav);
  }

   ngOnInit() {    
          this.createForm();
   }

   createForm(){
      this.contactForm = this._fb.group({
            name: ['', [<any>Validators.required]],
            email: ['', Validators.compose([Validators.required, this.mailFormat])],
            telephone: ['',Validators.compose([this.phoneFormat])],
            comment: ['', [<any>Validators.required]],
        });
   }

    mailFormat(control: FormControl): any {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
      return { "incorrectMailFormat": true };
    }
    return null;
  }

    phoneFormat(control: FormControl): any {
    var PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (control.value != "" && (!PHONE_REGEXP.test(control.value))) {
      return { "incorrectPhoneFormat": true };
    }
    return null;
  }


    contactsave(model: Contact, isValid: boolean) {
          this.isLoaderActive=true;
          this._contactusservice.postContactus(model)
            .subscribe(
                data => {
                if(data[0].status == 200){
                   this.successmessage = data[0].message.replace(/\\/g, '');
                }else if(data[0].status == 403){
                   this.errormessage = data[0].message.replace(/\\/g, '');
                }
                 this.createForm();
                 this.isLoaderActive=false;
                },
                error => {
                console.log(error);
                this.isLoaderActive=false;
                }
            ); 
    }

    resetform(){
       this.createForm();
    }

}