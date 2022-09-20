import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

/**
 * This is a Guard which only allows to navigate through it iff there is a current-user set in the local storage.
 * "Login" in our app just means that a user name was provided for which points are collected,
 * thus this Guard is all it needs to prevent users from opening pages which require the current-user.
 */
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
