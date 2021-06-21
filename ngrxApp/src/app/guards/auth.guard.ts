import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    private store: Store<fromRoot.State>) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const result = this.authService.isAuth();
    // if (result) {
    //   return true
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return this.store.select(fromRoot.getIsAuthenticated);
  }

}
