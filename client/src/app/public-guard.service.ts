import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {UserService} from './common/user-service/user.service';


/**
 * 'Protects' public routes form logged-in users
 */
@Injectable()
export class PublicGuardService implements CanActivate {
  constructor(private readonly userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.signedIn$.pipe(map(signedIn => {
      if (signedIn) {
        // This branch is choosen if the user is already signed in. For that case we want to
        // redirect him to the internal routes - preventing him from going to the login screen again.
        this.router.navigate(['/app']);
      }
      // But if the user is not logged in, let him access the login screen:
      return !signedIn;
    }));
  }
}
