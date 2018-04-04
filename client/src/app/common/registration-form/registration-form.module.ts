import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationFormComponent} from './registration-form.component';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegistrationFormComponent,
  ],
  exports: [
    RegistrationFormComponent,
  ],
})
export class RegistrationFormModule {
}
