import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ){
    
  }

  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.role
    console.log('expected: ', expectedRole)
    if (this.auth.userType == expectedRole) {
      //console.log('Authenticated')
      return true
    }
    else {
      //console.log('Not Authenticated')
      return this.router.navigate(['/auth/login'])
    }
  }
  
}
