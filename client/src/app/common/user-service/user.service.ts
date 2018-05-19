import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {LoginInfo, UserInfo} from '@core/auth/user-info';
import {storagePrefix} from '../storage/storage.module';
import {Router} from '@angular/router';
import {isAfter, subSeconds} from 'date-fns';

export const userInfoKey = 'user-info';
const refreshTokenKey = 'refresh-token';

// todo call them access and refresh tokens.

@Injectable()
export class UserService {

  userInfo$ = new BehaviorSubject<UserInfo | null>(null);
  /**
   * Assume that if there is a userInfo, then a user is currently signed in. */
  signedIn$: Observable<boolean> = this.userInfo$.pipe(map(it => !!it));

  constructor(private storageService: StorageService, private httpClient: HttpClient, private router: Router) {
    // // https://stackoverflow.com/questions/47531874/angular-maximum-call-stack-size-exceeded-when-use-injector
    // setTimeout(() => this.rehydrate());

    this.rehydrate();
  }

  /**
   * Loads the userInfo DIRECTLY from storage to bypass
   * asyncness of storage. This will break on changes to storage ! */
  async rehydrate() {
    console.log('rehydate');
    const loginInfo = JSON.parse(localStorage.getItem(`${storagePrefix}/ng_forage/${userInfoKey}`));
    if (!loginInfo) {
      return;
    }
    const tokenStillValid = this.checkExpired(loginInfo);

    if (loginInfo) {
      this.userInfo$.next(loginInfo);
    }

    if (loginInfo && tokenStillValid) {
      // await this.tokenRenewal(loginInfo);
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
  async tokenRenewal(userInfo: UserInfo): Promise<void> {

    // const tokenStillValid = isAfter(userInfo.expiresAt, new Date());
    //
    // if (!tokenStillValid) {
    //   alert(2)
    //   await this.outdatedRenewal();
    //   return;
    // }

    // Hier habe ich glaube ich noch einen Denkfehler im Server. Bzw es fehlt noch jedes mal beim
    // Renewal die Prüfung ob die Session noch vorhandne ist. Sonst wird ein Benutzer nicht ausgeloggt wenn die Session abläuft.

    console.log('token renewal running');
    const refreshedUserInfo = await this.httpClient.get<UserInfo>('/api/auth/authorized/renewal').toPromise();
    await this.saveUserInfo(refreshedUserInfo);
  }

  checkExpired(userInfo: UserInfo): boolean {
    return isAfter(userInfo.expiresAt, new Date());
  }

  async login(user: { mail: string, password: string }): Promise<void> {
    const loginInfo: LoginInfo = await this.httpClient.post<LoginInfo>('/api/auth', {
      mail: user.mail,
      password: user.password,
    }).toPromise();

    // save this forever.
    await this.storageService.setItem(refreshTokenKey, loginInfo.refreshToken);

    const realUserInfo: UserInfo = loginInfo.tokenResponse;
    await this.saveUserInfo(realUserInfo);
    console.log(realUserInfo);
    await this.router.navigate(['/app']);

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

  /**
   * Use this when the JWT is already expired*/
  async outdatedRenewal() {
    console.log('TOKEN WAS OUTDATED; THEREFORE GETTING  AFRESH ONE');
    const refreshToken = await this.storageService.getItem(refreshTokenKey);


    if (!refreshToken) {
      throw new Error('Couldnt refresh since no refresh token exists');
      // todo logout
    }

    const result = await this.httpClient.post<UserInfo>('/api/auth/refurbishment', {refreshToken: refreshToken}).toPromise();

    await this.saveUserInfo(result);

  }

  /**
   * Takes the UserIfo and saves it in storage.*/
  private async saveUserInfo(userInfo: UserInfo): Promise<void> {

    // this.setupAccessTokenRefresh(userInfo);
    this.userInfo$.next(userInfo);
    await this.storageService.setItem(userInfoKey, userInfo);
  }


  /**
   * Takes care that the acces token gets refreshed before expiration. */
  private setupAccessTokenRefresh(userInfo: UserInfo) {


    // dont know if i want to keep this at all since it cant handle situations on where the user goes offline.
    // OPtion 1: Listen for Online/offline
    // OPtion 2: Create a token interceptor that just re-sendes 401.

    // Option 3: Maybe the best. Before sending each HTTP Request determine whether the token is expired, then refresh.
    // i like this.
    const padding = 10;

    console.log('SHOUDL REFRESH THE TOKEN NOW');
    const xSecsBeforeEnd = subSeconds(userInfo.expiresAt, padding);
    const diffInMs = xSecsBeforeEnd.getTime() - new Date().getTime();
    console.log('diffInMs', diffInMs);

    if (diffInMs > 0) {
      console.log('setting up a refresh in ', diffInMs / 1000);
      setTimeout(() => {
        alert(1);
        this.tokenRenewal(userInfo);
      }, diffInMs);

    } else {
      // token is somehow already outdated. Refresh immediately
      throw new Error('token is somehow already outdated. Refresh immediately');
    }


  }


}


// todo remove outdated sessions!

