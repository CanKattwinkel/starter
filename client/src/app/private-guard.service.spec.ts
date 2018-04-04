import {inject, TestBed} from '@angular/core/testing';

import {PrivateGuardService} from './private-guard.service';
import {UserServiceMock} from './common/user-service/user.service.mock';
import {UserService} from './common/user-service/user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('PrivateGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrivateGuardService,
        {provide: UserService, useClass: UserServiceMock}
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([PrivateGuardService], (service: PrivateGuardService) => {
    expect(service).toBeTruthy();
  }));
});
