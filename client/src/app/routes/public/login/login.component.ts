import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/user-service/user.service';
import {User} from '@core/user/user.model';

@Component({
  selector: 'prk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  async login(user: User) {
    try {
      await this.userService.login(user);
    }
    catch (e) {
      console.log('Error while logging in.');
    }
  }

}
