import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './routes/public/public.module#PublicModule',
    canActivate: [],
  },
  {
    path: 'app',
    loadChildren: './routes/private/private.module#PrivateModule',
    canActivate: [],
  },
  {
    path: 'admin',
    loadChildren: './routes/admin/admin.module#AdminModule',
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
