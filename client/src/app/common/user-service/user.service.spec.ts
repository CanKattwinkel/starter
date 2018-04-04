import {inject, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {StorageService} from '../storage/storage.service';
import {StorageServiceMock} from '../storage/storage.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, {provide: StorageService, useClass: StorageServiceMock}],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
