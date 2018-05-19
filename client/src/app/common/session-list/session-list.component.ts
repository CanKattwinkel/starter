import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InfiniteSessionInfo} from '@core/auth/infinite-session-info';
import {Observable} from 'rxjs/Observable';
import {share} from 'rxjs/operators';

@Component({
  selector: 'prk-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {

  sessions$: Observable<InfiniteSessionInfo[]>;

  constructor(private httpClient: HttpClient) {
    this.sessions$ = this.getSessions();
  }

  ngOnInit() {
  }


  getSessions(): Observable<InfiniteSessionInfo[]> {
    return this.httpClient.get<InfiniteSessionInfo[]>('api/session').pipe(share());
  }

  removeSession(session: InfiniteSessionInfo) {
     this.httpClient.delete(`api/session/${session.id}`).subscribe();
     this.sessions$ = this.getSessions();
  }
}
