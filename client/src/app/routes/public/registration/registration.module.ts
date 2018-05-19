import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {RegistrationFormModule} from '../../../common/registration-form/registration-form.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    RegistrationFormModule,
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule {
}
