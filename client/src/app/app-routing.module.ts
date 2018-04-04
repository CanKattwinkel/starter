import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicGuardService} from './public-guard.service';
import {PrivateGuardService} from './private-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './routes/public/public.module#PublicModule',
    canActivate: [
      PublicGuardService
    ]
  },
  {
    path: 'app',
    loadChildren: './routes/private/private.module#PrivateModule',
    canActivate: [
      PrivateGuardService
    ],
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
