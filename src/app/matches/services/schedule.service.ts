import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matches } from '../core/classes/matches';
import { Schedule } from '../core/classes/Schedule';
import { Observable } from 'rxjs';
import { NameAndDate } from 'src/app/paintballfields/core/classes/nameAndDate';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  apiEndpoint = 'match';
  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get(`/teams/`);
  }

  getSharedSchedule(url: string) {
    return this.http.get(url);
  }

  getMatchByDate(nameDate: NameAndDate): Observable<Matches[]> {
    return this.http.get<Matches[]>(`${this.apiEndpoint}/${nameDate.date}/${nameDate.name}`);
  }

  getMatches() {
    return this.http.get(`${this.apiEndpoint}/getMatches`);
  }

  deleteAllMatches() {
    return this.http.delete(`${this.apiEndpoint}/deleteAllMatch`);
  }

  deleteMatchesForCurrentUser(nameDate: NameAndDate) {
    return this.http.delete(`${this.apiEndpoint}/${nameDate.date}/${nameDate.name}`);
  }

  postSchedule(schedule: Schedule) {
    return this.http.post(`${this.apiEndpoint}/createSchedule`, schedule);
  }
}
