import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Team } from '../core/classes/team';
import { environment } from 'src/environments/environment';
import { PagedResponse } from '../core/classes/paged-response';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  apiEndpoint = 'teams';

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
  });

  postTeam(formData: Team): Observable<Team> {
    return this.http.post<Team>(`${this.apiEndpoint}/create`, formData);
  }

  putTeam(formData: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiEndpoint}/` + formData.id, formData);
  }

  deleteTeam(id: number) {
    return this.http.delete(`${this.apiEndpoint}/` + id);
  }

  getTeam(filter = '', page = 1, pageSize = 10, sortColumn = 'Id', sortOrder = 'asc'): Observable<PagedResponse<Team>> {
    const url = `${this.apiEndpoint}/GetTeams`;
    const queryParams = new HttpParams()
      .set('filter', !filter ? '' : filter)
      .set('page', !page ? '1' : String(page))
      .set('pageSize', !pageSize ? '10' : String(pageSize))
      .set('sortColumn', !sortColumn ? 'Id' : String(sortColumn))
      .set('sortOrder', !sortOrder ? 'asc' : String(sortOrder));
    return this.http.get<PagedResponse<Team>>(url, {
      params: queryParams,
    });
  }

  getTeamForList(): Observable<Team[]> {
    const url = `${this.apiEndpoint}`;

    return this.http.get<Team[]>(url);
  }

  populateForm(team) {
    this.form.setValue(_.omit(team, 'name'));
  }
}
