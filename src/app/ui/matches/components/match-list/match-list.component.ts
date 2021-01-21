import { Component, OnInit } from '@angular/core';
import { BlockDto, FieldDto, KeyPairValueDto, PlanerService } from '../../../../api/services/planer-api.service';

@Component({
	selector: 'app-match-list',
	templateUrl: './match-list.component.html',
	styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit {
	blocks!: BlockDto[];
	fields!: FieldDto[];
	selectedField!: FieldDto;
	disableDateSelect = true;
	isLoading = false;

	constructor(private _planerService: PlanerService) {}

	ngOnInit(): void {
		this._planerService.getFieldWithMatches().subscribe((res) => {
			if (res) {
				this.fields = res;
			}
		});
	}

	onFieldChange(field: FieldDto) {
		this.selectedField = field;
		this.disableDateSelect = false;
	}

	onDateChange(item: KeyPairValueDto) {
		if (item.date && item.name) {
			this.isLoading = true;
			this._planerService.getMatchesByDate(new Date(item.date), item.name).subscribe((res: BlockDto[]) => {
				this.blocks = res;
				this.isLoading = false;
			});
		}
	}

	trackByFn(item: any) {
		return item.id;
	}
}
