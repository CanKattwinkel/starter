import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivateStartComponent} from './private-start.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserServiceMock} from '../../../common/user-service/user.service.mock';
import {UserService} from '../../../common/user-service/user.service';

describe('PrivateStartComponent', () => {
  let component: PrivateStartComponent;
  let fixture: ComponentFixture<PrivateStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateStartComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [{provide: UserService, useClass: UserServiceMock}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
