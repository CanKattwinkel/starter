import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginFormModule} from '../../../common/login-form/login-form.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UserServiceMock} from '../../../common/user-service/user.service.mock';
import {UserService} from '../../../common/user-service/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        LoginFormModule,
      ],
      providers: [{provide: UserService, useClass: UserServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


