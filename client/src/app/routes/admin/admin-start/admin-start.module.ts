import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStartRoutingModule } from './admin-start-routing.module';
import { AdminStartComponent } from './admin-start.component';

@NgModule({
  imports: [
    CommonModule,
    AdminStartRoutingModule
  ],
  declarations: [AdminStartComponent]
})
export class AdminStartModule { }
