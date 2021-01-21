import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
	providedIn: 'root',
})
export class RootAdminGuard implements CanActivate {
	constructor(private _authService: AuthService, private router: Router, private _alert: AlertService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
		// @ts-ignore
	): boolean {
		if (this._authService.isRootAdmin()) {
			return true;
		} else {
			this.router.navigate(['teams']);
			this._alert.warning('Du hast keine Berechtigung dafür!');
			return false;
		}
	}
}
