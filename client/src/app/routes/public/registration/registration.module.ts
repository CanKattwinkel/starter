import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {RegistrationFormModule} from '../../../common/registration-form/registration-form.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RegistrationFormModule,
    HttpClientModule,
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule {
}
