import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Roles } from '../core/classes/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken = {} as any;
  fixedUrl: any;
  controller = 'auth';
  apiRoleEndpoint = 'role';

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(`${this.controller}/` + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.controller}/` + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;

    for (const element of allowedRoles) {
      if (userRoles.includes(element)) {
        isMatch = true;
        return isMatch;
      }
    }
    return isMatch;
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiRoleEndpoint}`);
  }
}
