import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form.component';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  declarations: [
    LoginFormComponent,
  ],
  exports: [
    LoginFormComponent,
  ],
})
export class LoginFormModule {
}
