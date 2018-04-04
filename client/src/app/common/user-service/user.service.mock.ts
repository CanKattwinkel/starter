import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';
import {UserInfo} from '@core/auth/user-info';


export class UserServiceMock implements Partial<UserService> {

  userInfo$ = new BehaviorSubject<UserInfo | null>(null);

  signedIn$: Observable<boolean> = this.userInfo$.pipe(map(it => !!it));


  async register(user: { mail: string, password: string }): Promise<void> {
    return Promise.resolve();
  }


  async logout(): Promise<void> {
    return Promise.resolve();
  }

  async login(user: { mail: string, password: string }): Promise<void> {
    return Promise.resolve();
  }
}
