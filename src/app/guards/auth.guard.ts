import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  isAuthenticated: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.isLoggedIn().subscribe(isLoggedIn => {
        this.isAuthenticated= isLoggedIn || this.authService.hasToken();
      })
      
    if (!this.isAuthenticated) {
      this.router.navigate(['/404']);
    }
    return this.isAuthenticated;
  }

}
