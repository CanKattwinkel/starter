import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/user-service/user.service';

@Component({
  selector: 'prk-private-start',
  templateUrl: './private-start.component.html',
  styleUrls: ['./private-start.component.scss']
})
export class PrivateStartComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
