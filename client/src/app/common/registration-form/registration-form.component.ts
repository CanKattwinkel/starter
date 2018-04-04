import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@core/user/user.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'prk-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;

  @Output() save = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    const initialMailValue = environment.production ? '' : Math.random() + 'user@example.com';
    const initialPasswordValue = environment.production ? '' : 'password';

    this.registerForm = this.formBuilder.group({
      mail: [initialMailValue, [Validators.required, Validators.email]],
      password: [initialPasswordValue, Validators.required]
    });
  }


  submit() {
    if (this.registerForm.valid) {
      this.save.next(this.registerForm.value as User);
    }
  }

}
