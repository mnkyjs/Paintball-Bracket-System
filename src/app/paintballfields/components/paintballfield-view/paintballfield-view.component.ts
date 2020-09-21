import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FieldLocation } from 'src/app/locations/core/classes/fieldLocation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldService } from '../../services/field.service';
import { LocationService } from 'src/app/locations/services/location.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paintballfield-view',
  templateUrl: './paintballfield-view.component.html',
  styleUrls: ['./paintballfield-view.component.scss'],
})
export class PaintballfieldViewComponent implements OnInit, OnDestroy {
  // Observable workflow fix
  public subscription: Subscription = new Subscription();
  locations: FieldLocation[] = [];
  fieldForm: FormGroup;

  tempLocation: FieldLocation;

  constructor(
    public dialogRef: MatDialogRef<PaintballfieldViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fieldService: FieldService,
    private alert: AlertService,
    private locationService: LocationService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.locationService.getLocation().subscribe((res) => {
        this.locations = res;
        if (this.data.field.locationId !== undefined) {
          this.tempLocation = this.findLocation(this.data.field.locationId);
        } else {
          this.tempLocation = this.findLocation(3);
        }
      })
    );

    this.fieldForm = new FormGroup({
      id: new FormControl(this.data.field.id, []),
      name: new FormControl(this.data.field.name, [Validators.required, Validators.minLength(2)]),
      street: new FormControl(this.data.field.street, [Validators.required, Validators.minLength(2)]),
      houseNumber: new FormControl(this.data.field.houseNumber, []),
      postalCode: new FormControl(this.data.field.postalCode, [Validators.required, Validators.minLength(2)]),
      place: new FormControl(this.data.field.place, [Validators.required, Validators.minLength(2)]),
      locationId: new FormControl(this.data.field.locationId, [Validators.required]),
      phoneNumber: new FormControl(this.data.field.phoneNumber, []),
    });
  }

  findLocation(locationId: number): FieldLocation {
    const getFLocation = this.locations.find((x) => x.id === locationId);
    if (getFLocation !== undefined) {
      return getFLocation;
    }
  }

  create() {
    if (this.fieldForm.valid) {
      if (!this.fieldForm.get('id').value) {
        this.subscription.add(
          this.fieldService.postField(this.fieldForm.value).subscribe(
            (res) => {
              this.alert.success(`Feld ${res.name} wurde erstellt`);
            },
            (error) => {
              this.alert.error(error);
            }
          )
        );
        this.fieldForm.reset();
      } else {
        this.subscription.add(
          this.fieldService.putfield(this.fieldForm.value).subscribe(
            (res) => {
              this.alert.success(`Feld ${res.name} wurde bearbeitet`);
            },
            (error) => {
              this.alert.error(error);
            }
          )
        );
      }
    }
    this.onNoClick();
  }
  onNoClick(): void {
    this.fieldService.form.reset();
    this.dialogRef.close();
    this.ngOnInit();
  }

  trackByFn(item) {
    return item.id;
  }
}
