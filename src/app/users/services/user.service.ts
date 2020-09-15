import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/matches/core/classes/Schedule';
import { environment } from 'src/environments/environment';
import { NameAndDate } from 'src/app/paintballfields/core/classes/nameAndDate';
import { User, AuthUser } from '../core/classes/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Roles } from 'src/app/shared/core/classes/roles';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiEndpoint = 'Users';

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    teamname: new FormControl(),
    created: new FormControl(),
  });

  getMatches(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiEndpoint}/GetSharedMatches`);
  }

  getMatchByDate(nameDate: NameAndDate) {
    return this.http.get(`${this.apiEndpoint}/${nameDate.date}/${nameDate.name}`);
  }

  getUser(id: number): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${this.apiEndpoint}/` + id);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiEndpoint}`);
  }

  putUser(formData: AuthUser): Observable<AuthUser> {
    return this.http.put<AuthUser>(`${this.apiEndpoint}/` + formData.id, formData);
  }

  putRoles(formData: AuthUser, roles): Observable<AuthUser> {
    const rolesToSend = {} as Roles;
    rolesToSend.roleNames = roles;
    return this.http.post<AuthUser>(`${this.apiEndpoint}/` + formData.userName, rolesToSend);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiEndpoint}/` + id);
  }
}
