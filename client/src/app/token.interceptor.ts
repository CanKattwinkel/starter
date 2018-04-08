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
import {headerNameXsrf} from '@core/auth/xsrf-token';
import {userInfoKey} from './common/user-service/user.service';
import {storagePrefix} from './common/storage/storage.module';
import {UserInfo} from '@core/auth/user-info';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  /**
   * I extend the request to include the xsrf header - that i get from localstorages userInfo. */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xsrfToken = this.getXsrfValue();

    if (xsrfToken) {
      request = request.clone({
        setHeaders: {
          [headerNameXsrf]: xsrfToken,
        }
      });
    }
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log('handle error here');
        }
      }
    });
  }

  getXsrfValue(): string | null {
    const userInfo: UserInfo = JSON.parse(localStorage.getItem(`${storagePrefix}/ng_forage/${userInfoKey}`));
    return userInfo ? userInfo.xsrfToken : null;
  }
}

