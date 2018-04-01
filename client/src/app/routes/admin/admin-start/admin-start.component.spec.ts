import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStartComponent } from './admin-start.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AdminStartComponent', () => {
  let component: AdminStartComponent;
  let fixture: ComponentFixture<AdminStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStartComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
