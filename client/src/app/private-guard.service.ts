import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {UserService} from './common/user-service/user.service';

/**
 * Protects privates routes from not logged users
 */
@Injectable()
export class PrivateGuardService implements CanActivate {

  constructor(private readonly userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.signedIn$.pipe(map(signedIn => {
      if (!signedIn) {
        this.router.navigate(['/']);
      }
      return signedIn;
    }));
  }
}
