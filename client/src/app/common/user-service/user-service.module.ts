import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './user.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: []
})
export class UserServiceModule {

  /**
   * Use forRoot to ensure that there is exactly once instance existing. */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserServiceModule,
      providers: [
        UserService
      ]
    };
  }

}
