import {Component, OnInit} from '@angular/core';
import {User} from '@core/user/user.model';
import {UserService} from '../../../common/user-service/user.service';

@Component({
  selector: 'prk-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  save(user: User) {
    this.userService.register(user);
  }

}
