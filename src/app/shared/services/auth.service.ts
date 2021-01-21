import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { PlanerService, UserForLoginDto, UserForRegisterDto } from '../../api/services/planer-api.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	jwtHelper = new JwtHelperService();

	constructor(private apiService: PlanerService) {}

	login(model: UserForLoginDto) {
		return this.apiService.login(model).pipe(
			map((model) => {
				if (model.token) localStorage.setItem('token', model.token);
			})
		);
	}

	register(model: UserForRegisterDto) {
		return this.apiService.register(model).pipe(
			map((model) => {
				if (model.token) {
					localStorage.setItem('token', model.token);
				}
			})
		);
	}

	isRootAdmin(): boolean {
		let isMatch = false;
		const userRoles = this.getTokenInfo().role as Array<string>;
		if (userRoles.includes('RootAdmin')) {
			isMatch = true;
			return isMatch;
		}
		return isMatch;
	}

	roleMatch(allowedRoles: any[]): boolean {
		let isMatch = false;
		const userRoles = this.getTokenInfo().role as Array<string>;

		for (const element of allowedRoles) {
			if (userRoles.includes(element)) {
				isMatch = true;
				return isMatch;
			}
		}
		return isMatch;
	}

	getTokenInfo() {
		const token = localStorage.getItem('token');
		if (token) return this.jwtHelper.decodeToken(token);
	}

	loggedIn() {
		const token = localStorage.getItem('token');
		if (token) return !this.jwtHelper.isTokenExpired(token);
		return false;
	}
}
