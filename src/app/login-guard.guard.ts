import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if there is a current user set in localStorage
    const hasUser = localStorage['current-user'] != null;

    if (hasUser) {
      // If a user has been set everything is ok, you are allowed to open all pages of the app
      return true;
    } else {
      // If there is no user set redirect the app to the /login page
      this.router.navigate(['login']);
      // and reject the attempt to open any other page
      return false;
    }
  }
}
