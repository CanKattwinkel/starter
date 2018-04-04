import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {RegistrationFormComponent} from '../../../common/registration-form/registration-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {UserServiceMock} from '../../../common/user-service/user.service.mock';
import {UserService} from '../../../common/user-service/user.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent, RegistrationFormComponent,],
      imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, NoopAnimationsModule],
      providers: [{provide: UserService, useClass: UserServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
