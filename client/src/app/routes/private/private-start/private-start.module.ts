import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateStartRoutingModule } from './private-start-routing.module';
import { PrivateStartComponent } from './private-start.component';

@NgModule({
  imports: [
    CommonModule,
    PrivateStartRoutingModule
  ],
  declarations: [PrivateStartComponent]
})
export class PrivateStartModule { }
