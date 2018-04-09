import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {UserInfo} from '@core/auth/user-info';
import {storagePrefix} from '../storage/storage.module';
import {Router} from '@angular/router';
import {isAfter} from 'date-fns';

export const userInfoKey = 'user-info';

@Injectable()
export class UserService {

  userInfo$ = new BehaviorSubject<UserInfo | null>(null);

  /**
   * Assume that if there is a userInfo, then a user is currently signed in. */
  signedIn$: Observable<boolean> = this.userInfo$.pipe(map(it => !!it));

  constructor(private storageService: StorageService, private httpClient: HttpClient, private router: Router) {
    this.rehydrate();
  }

  /**
   * Loads the userInfo DIRECTLY from storage to bypass
   * asyncness of storage. This will break on changes to storage ! */
  async rehydrate() {
    const userInfo = JSON.parse(localStorage.getItem(`${storagePrefix}/ng_forage/${userInfoKey}`));
    const tokenValid = this.checkExpired(userInfo);
    if (userInfo && tokenValid) {
      this.userInfo$.next(userInfo);
      await this.tokenRenewal();
    }
  }


  /**
   * Every time the application is loaded a new token is fetched form the api. If the user doesn't
   * login for too long he will be redirected to login since is token expires.
   *
   * While this approach is suitable for web clients it is not for mobile applications since you'd expect
   * tokens / logins to be infinite valid.
   *
   * See https://stackoverflow.com/a/26834685/6533425
   * */
  async tokenRenewal() {
    console.log('token renewal running');
    const userInfo = await this.httpClient.get<UserInfo>('/api/auth/authorized/renewal').toPromise();
    await this.saveUserInfo(userInfo);
  }

  checkExpired(userInfo: UserInfo): boolean {
    return isAfter(userInfo.expiresAt, new Date());
  }


  async register(user: { mail: string, password: string }): Promise<void> {
    const userInfo = await this.httpClient.post<UserInfo>('/api/auth/register', user).toPromise();
    await this.saveUserInfo(userInfo);
    await this.router.navigate(['/app']);
  }


  async logout(): Promise<void> {
    await this.storageService.removeItem(userInfoKey);
    this.userInfo$.next(null);
    await this.router.navigate(['/']);
  }

  async login(user: { mail: string, password: string }): Promise<void> {
    const userInfo: UserInfo = await this.httpClient.post<UserInfo>('/api/auth', {
      mail: user.mail,
      password: user.password,
    }).toPromise();

    await this.saveUserInfo(userInfo);
    await this.router.navigate(['/app']);

  }

  /**
   * Takes the UserIfo and saves it in storage.*/
  private async saveUserInfo(userInfo: UserInfo): Promise<void> {
    this.userInfo$.next(userInfo);
    await this.storageService.setItem(userInfoKey, userInfo);
  }

}

