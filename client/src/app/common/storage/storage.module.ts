import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgForageConfig, NgForageModule} from 'ngforage';
import {StorageService} from './storage.service';

@NgModule({
  imports: [
    CommonModule,
    NgForageModule.forRoot(),
  ],
})
export class StorageModule {
  public constructor(ngfConfig: NgForageConfig) {
    ngfConfig.configure({
      name: 'ab--dd',
      // We'll be using localStorage since we are going to save jwt token only
      // currently. This might change as the application grows.
      driver: [
        NgForageConfig.DRIVER_LOCALSTORAGE,
        NgForageConfig.DRIVER_INDEXEDDB
      ]
    });
  }

  /**
   * Use forRoot to ensure that there is exactly once instance existing. */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [
        StorageService
      ]
    };
  }

}
