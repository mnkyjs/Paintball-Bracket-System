import { Component, OnInit, ViewChild } from '@angular/core';

import { Field } from '../../core/classes/field';
import { SelectionModel } from '@angular/cdk/collections';
import { FieldService } from '../../services/field.service';
import { PaintballfieldViewComponent } from '../paintballfield-view/paintballfield-view.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-paintballfield-list',
  templateUrl: './paintballfield-list.component.html',
  styleUrls: ['./paintballfield-list.component.scss'],
})
export class PaintballfieldListComponent implements OnInit {
  displayedColumns = ['name', 'action'];
  dataSource: MatTableDataSource<Field>;
  selection: SelectionModel<Field>;
  isLinear = true;
  fields: Field[] = [];
  field: Field;
  showDetails = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private fieldService: FieldService,
    private alert: AlertService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.fieldService.getField().subscribe(
      (fields: Field[]) => {
        this.fields = fields;
        this.dataSource = new MatTableDataSource<Field>(this.fields);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }

  onCreate() {
    this.field = new Field();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      username: '',
      field: this.field,
    };

    const dialogRef = this.dialog.open(PaintballfieldViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.field = result;
      this.ngOnInit();
    });
  }

  onEdit(rowId, row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.field = this.findField(rowId);
    dialogConfig.data = {
      field: this.field,
      showDetails: this.showDetails,
    };
    const dialogRef = this.dialog.open(PaintballfieldViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.field = result;
      this.ngOnInit();
    });
  }

  onDelete(id: number) {
    this.fieldService.deleteField(id).subscribe(
      () => {
        this.alert.success('delete successful');
        this.ngOnInit();
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  expandedDetails(rowId) {
    if (this.showDetails === false) {
      this.showDetails = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.field = this.findField(rowId);
      dialogConfig.data = {
        field: this.field,
        showDetails: this.showDetails,
      };

      const dialogRef = this.dialog.open(PaintballfieldViewComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.field = result;
        this.showDetails = false;
        this.ngOnInit();
      });
    } else {
      this.showDetails = false;
    }
  }

  findField(fieldId: number): Field {
    const getField = this.fields.find((x) => x.id === fieldId);
    if (getField !== undefined) {
      return getField;
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
