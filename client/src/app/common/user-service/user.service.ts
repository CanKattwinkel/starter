import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {UserInfo} from '@core/auth/user-info';
import {storagePrefix} from '../storage/storage.module';
import {Router} from '@angular/router';

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
  rehydrate() {
    const userInfo = localStorage.getItem(`${storagePrefix}/ng_forage/${userInfoKey}`);
    if (userInfo) {
      this.userInfo$.next(JSON.parse(userInfo));
    }
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

