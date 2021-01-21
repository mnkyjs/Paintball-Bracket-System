import { Component, Inject, OnInit } from '@angular/core';
import { PlanerService, TeamDto } from '../../../../api/services/planer-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../../shared/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-team-view',
	templateUrl: './team-view.component.html',
	styleUrls: ['./team-view.component.scss'],
})
export class TeamViewComponent implements OnInit {
	teamForm: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<TeamViewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private _planerService: PlanerService,
		private _alert: AlertService,
		private _fb: FormBuilder
	) {
		this.teamForm = this._fb.group({
			id: [data.team.id],
			name: [data.team.name, Validators.required],
		});
	}

	ngOnInit() {}

	create() {
		if (this.teamForm.valid) {
			if (!this.teamForm.get('id')?.value) {
				this._planerService.postTeam(this.teamForm.value).subscribe(
					(res) => {
						this._alert.success(`Team ${res.name} wurde erstellt`);
					},
					(error) => {
						this._alert.error(error);
					}
				);
			} else {
				this._planerService.updateTeam(this.teamForm.get('id')?.value, this.teamForm.value).subscribe(
					(res) => {
						this._alert.success(`Team ${res.name} wurde bearbeitet`);
					},
					(error) => {
						this._alert.error(error);
					}
				);
			}
		}
		this.onNoClick();
	}

	onNoClick(): void {
		this.teamForm.reset();
		this.dialogRef.close();
	}
}
