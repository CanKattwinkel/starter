import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from '@core/auth/token-response';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {addSeconds} from 'date-fns';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {UserInfo} from '@core/auth/user-info';
import {storagePrefix} from '../storage/storage.module';
import {Router} from '@angular/router';

export const jwtTokenKey = 'jwt-token';

@Injectable()
export class UserService {

  userInfo$ = new BehaviorSubject<UserInfo | null>(null);

  /**
   * Assume that if there is a token, then a user is currently signed in. */
  signedIn$: Observable<boolean> = this.userInfo$.pipe(map(it => !!it));

  constructor(private storageService: StorageService, private httpClient: HttpClient, private router: Router) {
    this.rehydrate();
  }

  /**
   * Loads the users token DIRECTLY from storage to bypass
   * asyncness of storage. This will break on changes to storage ! */
  rehydrate() {
    const token = localStorage.getItem(`${storagePrefix}/ng_forage/${jwtTokenKey}`);
    if (token) {
      const userInfo = parseJwt(token);
      this.userInfo$.next(userInfo);
    }
  }


  async register(user: { mail: string, password: string }): Promise<void> {
    const tokenResponse = await this.httpClient.post<TokenResponse>('/api/auth/register', user).toPromise();
    await this.saveToken(tokenResponse);
    await this.router.navigate(['/app']);
  }


  async logout(): Promise<void> {
    await this.storageService.removeItem(jwtTokenKey);
    this.userInfo$.next(null);
    await this.router.navigate(['/']);
  }

  async login(user: { mail: string, password: string }): Promise<void> {
    const tokenResponse: TokenResponse = await this.httpClient.post<TokenResponse>('/api/auth', {
      mail: user.mail,
      password: user.password,
    }).toPromise();

    await this.saveToken(tokenResponse);
    await this.router.navigate(['/app']);

  }

  /**
   * Takes the JWT Token and saves it in storage.*/
  private async saveToken(tokenResponse: TokenResponse): Promise<void> {
    this.userInfo$.next(parseJwt(tokenResponse.access_token));
    await this.storageService.setItem(jwtTokenKey, tokenResponse.access_token);
  }


  /**
   * Adds the expires in to the current date. */
  private calcExpiresIn(expiresSeconds: number): Date {
    const now = new Date();
    return addSeconds(now, expiresSeconds);
  }


}

// via https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};
