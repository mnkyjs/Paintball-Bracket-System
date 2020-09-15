import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Field, FieldForFormData } from '../core/classes/field';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  apiEndpoint = 'field';

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    houseNumber: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    place: new FormControl('', Validators.required),
  });

  postField(field: Field): Observable<Field> {
    return this.http.post<Field>(`${this.apiEndpoint}/create`, field);
  }

  putfield(field: Field): Observable<Field> {
    return this.http.put<Field>(`${this.apiEndpoint}/` + field.id, field);
  }

  deleteField(id: number) {
    return this.http.delete(`${this.apiEndpoint}/` + id);
  }

  getField(): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiEndpoint}/`);
  }

  getFieldsWithMatches(): Observable<Field[]> {
    return this.http.get<Field[]>(`${this.apiEndpoint}/getFieldWithMatches`);
  }

  populateForm(field) {
    this.form.setValue(_.omit(field, 'name'));
  }

  convertFieldToFormData(field: Field) {
    const formData = new FieldForFormData();
    if (field.id > 0) {
      formData.id = String(field.id);
    } else {
      formData.id = String(0);
    }
    formData.name = field.name;
    formData.street = field.street;
    formData.place = field.place;
    formData.houseNumber = String(field.houseNumber);
    formData.postalCode = String(field.postalCode);
    formData.phoneNumber = field.phoneNumber;
    formData.locationId = String(field.locationId);

    return formData;
  }

  backupPostField(field: Field): Observable<Field> {
    const formData = new FormData();
    const parsedField = this.convertFieldToFormData(field);
    formData.append('id', parsedField.id);
    formData.append('name', field.name);
    formData.append('street', field.street);
    formData.append('houseNumber', field.houseNumber);
    formData.append('postalCode', parsedField.postalCode);
    formData.append('place', field.place);
    formData.append('phoneNumber', field.phoneNumber);
    formData.append('locationId', parsedField.locationId);

    return this.http.post<Field>(`${environment.apiUrl}/${this.apiEndpoint}/create`, formData);
  }
}
