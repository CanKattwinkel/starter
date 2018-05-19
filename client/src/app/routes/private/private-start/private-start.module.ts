import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateStartRoutingModule } from './private-start-routing.module';
import { PrivateStartComponent } from './private-start.component';
import {SessionListModule} from '../../../common/session-list/session-list.module';

@NgModule({
  imports: [
    CommonModule,
    PrivateStartRoutingModule,
    SessionListModule,
  ],
  declarations: [PrivateStartComponent]
})
export class PrivateStartModule { }
