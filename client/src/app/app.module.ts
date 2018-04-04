import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageModule} from './common/storage/storage.module';
import {UserServiceModule} from './common/user-service/user-service.module';
import {PublicGuardService} from './public-guard.service';
import {PrivateGuardService} from './private-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StorageModule.forRoot(),
    UserServiceModule.forRoot(),
  ],
  providers: [
    PublicGuardService,
    PrivateGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
