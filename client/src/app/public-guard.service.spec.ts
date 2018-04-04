import {inject, TestBed} from '@angular/core/testing';

import {PublicGuardService} from './public-guard.service';
import {UserServiceMock} from './common/user-service/user.service.mock';
import {UserService} from './common/user-service/user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('PublicGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicGuardService,
        {provide: UserService, useClass: UserServiceMock}
      ],
      imports: [
        RouterTestingModule
      ]

    });
  });

  it('should be created', inject([PublicGuardService], (service: PublicGuardService) => {
    expect(service).toBeTruthy();
  }));
});
