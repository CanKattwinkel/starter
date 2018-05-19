import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionListComponent } from './session-list.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SessionListComponent,
  ],
  exports: [
    SessionListComponent,
  ],
})
export class SessionListModule { }
