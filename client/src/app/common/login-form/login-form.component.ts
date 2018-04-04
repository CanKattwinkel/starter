import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@core/user/user.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'prk-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  @Output() login = new EventEmitter<User>();
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mail: [environment.production ? '' : 'user@example.com', Validators.required],
      password: [environment.production ? '' : 'password', Validators.required]
    });
  }

  go() {
    if (this.loginForm.valid) {
      this.login.next(this.loginForm.value);
    }
  }

}
