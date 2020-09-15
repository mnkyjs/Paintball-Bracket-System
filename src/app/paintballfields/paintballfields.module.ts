import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintballfieldsRoutingModule } from './paintballfields-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaintballfieldListComponent } from './components/paintballfield-list/paintballfield-list.component';
import { PaintballfieldViewComponent } from './components/paintballfield-view/paintballfield-view.component';

import { SharedModule } from '../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [PaintballfieldListComponent, PaintballfieldViewComponent],
  imports: [
    CommonModule,
    PaintballfieldsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    SharedModule,
  ],
})
export class PaintballfieldsModule {}
