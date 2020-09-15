import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { FieldLocation } from '../core/classes/fieldLocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiEndpoint = 'Location';

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
  });

  postLocation(formData: any): Observable<FieldLocation> {
    return this.http.post<FieldLocation>(`${this.apiEndpoint}/create`, formData);
  }

  putLocation(formData: any): Observable<FieldLocation> {
    return this.http.post<FieldLocation>(`${this.apiEndpoint}/` + formData.id, formData);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.apiEndpoint}/` + id);
  }

  getLocation(): Observable<FieldLocation[]> {
    return this.http.get<FieldLocation[]>(`${this.apiEndpoint}/`);
  }

  populateForm(field) {
    this.form.setValue(_.omit(field, 'name'));
  }
}
