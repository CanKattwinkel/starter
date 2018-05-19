import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {userInfoKey, UserService} from './common/user-service/user.service';
import {storagePrefix} from './common/storage/storage.module';
import {UserInfo} from '@core/auth/user-info';
import {of} from 'rxjs/observable/of';
import {switchMap, tap} from 'rxjs/operators';
import {StorageService} from './common/storage/storage.service';
import {isBefore, subSeconds} from 'date-fns';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private userService: UserService) {
  }

  /**
   * I extend the request to include the xsrf header - that i get from localstorages userInfo. */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xsrfToken = this.getXsrfValue();
    if (xsrfToken) {
      request = request.clone({
        setHeaders: {
          'X-XSRF-TOKEN': xsrfToken,
        }
      });
    }


    const refurbishmentRequest = request.url === '/api/auth/refurbishment';
    return of(null).pipe(
      switchMap(() => this.storageService.getItem<UserInfo>(userInfoKey)),
      switchMap(async (it: UserInfo | null) => {
        const offsetSecBeforeNow = subSeconds(new Date(), 5);
        if (!refurbishmentRequest && it && isBefore(it.expiresAt, offsetSecBeforeNow)) {
          await this.userService.outdatedRenewal();
          const xsrfToken = this.getXsrfValue();
          request = request.clone({
            setHeaders: {
              'X-XSRF-TOKEN': xsrfToken,
            }
          });
        } else {
          return Promise.resolve();
        }

      }),
      switchMap(_ => next.handle(request)),
      tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log('handle error here');
        }
      }
      })
    );
  }

  getXsrfValue(): string | null {
    const userInfo: UserInfo = JSON.parse(localStorage.getItem(`${storagePrefix}/ng_forage/${userInfoKey}`));
    return userInfo ? userInfo.xsrfToken : null;
  }
}

