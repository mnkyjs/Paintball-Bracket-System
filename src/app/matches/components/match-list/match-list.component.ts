import { Component, OnInit } from '@angular/core';
import { BlockDto, FieldDto, PlanerService } from '../../../api/services/planer-api.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {
  blocks!: BlockDto[];
  fields!: FieldDto[];
  selectedField!: FieldDto;
  disableDateSelect = true;
  isLoading = false;

  constructor(private _planerService: PlanerService) {
  }

  ngOnInit(): void {
    this._planerService.getFieldWithMatches().subscribe((res) => {
      if (res) {
        this.fields = res;
      }
    });
  }

  onFieldChange(field: FieldDto): void {
    this.selectedField = field;
    this.disableDateSelect = false;
  }

  onDateChange(guid: string): void {
    if (guid) {
      this.isLoading = true;
      this._planerService.getMatchesByGuid(guid).subscribe((res: BlockDto[]) => {
        this.blocks = res;
        this.isLoading = false;
      });
    }
  }

  trackByFn(item: any): number {
    return item.id;
  }
}
