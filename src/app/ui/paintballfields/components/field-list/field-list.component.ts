import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldDto, PlanerService } from '../../../../api/services/planer-api.service';
import { FieldViewComponent } from '../field-view/field-view.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-field-list',
	templateUrl: './field-list.component.html',
	styleUrls: ['./field-list.component.scss'],
})
export class FieldListComponent implements OnInit {
	public displayedColumns = ['name', 'action'];
	public dataSource!: MatTableDataSource<FieldDto>;
	public fields: FieldDto[] = [];
	public field!: FieldDto;
	public showDetails = false;
	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

	constructor(
		private _planerService: PlanerService,
		private _alert: AlertService,
		private authService: AuthService,
		private dialog: MatDialog
	) {}

	ngOnInit() {
		this.initCache();
	}

	initCache() {
		this._planerService.getListOfAllFields().subscribe(
			(fields: FieldDto[]) => {
				this.fields = fields;
				this.dataSource = new MatTableDataSource<FieldDto>(this.fields);
				this.dataSource.paginator = this.paginator;
			},
			(error: any) => {
				this._alert.error(error);
			}
		);
	}

	onCreate() {
		this.field = {} as FieldDto;
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			username: '',
			field: this.field,
		};

		const dialogRef = this.dialog.open(FieldViewComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((result) => {
			this.field = result;
			this.ngOnInit();
		});
	}

	onEdit(row: FieldDto) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			field: row,
			showDetails: this.showDetails,
		};
		const dialogRef = this.dialog.open(FieldViewComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((result) => {
			this.field = result;
			this.ngOnInit();
		});
	}

	onDelete(id: number) {
		this._planerService.deleteField(id).subscribe(
			() => {
				this._alert.success('delete successful');
				this.ngOnInit();
			},
			(error) => {
				this._alert.error(error);
			}
		);
	}

	doFilter(value: string) {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	expandedDetails(row: FieldDto) {
		if (!this.showDetails) {
			this.showDetails = true;
			const dialogConfig = new MatDialogConfig();
			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				field: row,
				showDetails: this.showDetails,
			};

			const dialogRef = this.dialog.open(FieldViewComponent, dialogConfig);
			dialogRef.afterClosed().subscribe((result: any) => {
				this.field = result;
				this.showDetails = false;
				this.ngOnInit();
			});
		} else {
			this.showDetails = false;
		}
	}

	loggedIn() {
		return this.authService.loggedIn();
	}
}
