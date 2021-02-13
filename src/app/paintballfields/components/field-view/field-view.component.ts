import { Component, Inject, OnInit } from '@angular/core';
import { LocationDto, PlanerService } from '../../../api/services/planer-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-field-view',
  templateUrl: './field-view.component.html',
  styleUrls: ['./field-view.component.scss']
})
export class FieldViewComponent implements OnInit {
  locations: LocationDto[] = [];
  fieldForm!: FormGroup;
  tempLocation!: LocationDto;

  constructor(
    public dialogRef: MatDialogRef<FieldViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _planerService: PlanerService,
    private _alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this._planerService.getListOfAllLocations().subscribe((res) => {
      this.locations = res;
      if (this.data.field.locationId !== undefined) {
        this.tempLocation = this.findLocation(this.data.field.locationId);
      } else {
        this.tempLocation = this.findLocation(3);
      }
    });

    this.fieldForm = new FormGroup({
      id: new FormControl(this.data.field.id, []),
      name: new FormControl(this.data.field.name, [Validators.required, Validators.minLength(2)]),
      street: new FormControl(this.data.field.street, [Validators.required, Validators.minLength(2)]),
      houseNumber: new FormControl(this.data.field.houseNumber, []),
      postalCode: new FormControl(this.data.field.postalCode, [Validators.required, Validators.minLength(2)]),
      place: new FormControl(this.data.field.place, [Validators.required, Validators.minLength(2)]),
      locationId: new FormControl(this.data.field.locationId, [Validators.required]),
      phoneNumber: new FormControl(this.data.field.phoneNumber, [])
    });
  }

  // @ts-ignore
  findLocation(locationId: number): LocationDto {
    const getFLocation = this.locations.find((x) => x.id === locationId);
    if (getFLocation !== undefined) {
      return getFLocation;
    }
  }

  create(): void {
    if (this.fieldForm.valid) {
      if (!this.fieldForm.get('id')?.value) {
        this._planerService.postField(this.fieldForm.value).subscribe(
          (res) => {
            this._alert.success(`Feld ${res.name} wurde erstellt`);
          },
          (error: any) => {
            this._alert.error(error);
          }
        );
        this.fieldForm.reset();
      } else {
        this._planerService.updateField(this.fieldForm.get('id')?.value, this.fieldForm.value).subscribe(
          (res) => {
            this._alert.success(`Feld ${res.name} wurde bearbeitet`);
          },
          (error: any) => {
            this._alert.error(error);
          }
        );
      }
    }
    this.onNoClick();
  }

  onNoClick(): void {
    this.fieldForm.reset();
    this.dialogRef.close();
    this.ngOnInit();
  }

  trackByFn(item: any): number {
    return item.id;
  }
}
