import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../common/user-service/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'prk-private-start',
  templateUrl: './private-start.component.html',
  styleUrls: ['./private-start.component.scss']
})
export class PrivateStartComponent implements OnInit {

  constructor(private userService: UserService, private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

  testConnection() {
    this.httpClient.get<any>('/api/auth/authorized').subscribe(console.log)
  }
}
