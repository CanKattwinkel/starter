import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminStartComponent} from './admin-start.component';

const routes: Routes = [
  {
    path: '',
    component: AdminStartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStartRoutingModule {
}
