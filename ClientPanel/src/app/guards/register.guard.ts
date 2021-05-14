import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.settingsService.getSettings().allowRegistration){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  
  }
  
  constructor(private router: Router, private settingsService: SettingsService) { }

}
