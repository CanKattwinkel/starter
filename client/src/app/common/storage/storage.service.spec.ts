import {inject, TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {NgForageModule} from 'ngforage';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      imports: [
        NgForageModule.forRoot(),
      ],
    });
  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
