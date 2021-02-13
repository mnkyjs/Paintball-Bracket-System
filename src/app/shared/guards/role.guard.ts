import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router, private _alert: AlertService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    // @ts-ignore
  ): boolean {
    if (this._authService.getTokenInfo() !== null) {
      const roles = this._authService.getTokenInfo().role;
      if (roles !== undefined) {
        const match = this._authService.roleMatch(roles);
        if (match) {
          return true;
        }
      }
    } else {
      this.router.navigate(['teams']);
      this._alert.warning('Du hast keine Berechtigung dafür!');
      return false;
    }
  }
}
