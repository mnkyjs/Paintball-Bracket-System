import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScheduleService } from '../../services/schedule.service';
import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Matches } from '../../core/classes/matches';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss'],
})
export class MatchViewComponent implements OnInit, OnChanges {
  @Input() matches: Matches[];
  @Input() showButton: boolean;
  @ViewChild('matchTable') table: any;

  constructor(public service: ScheduleService) {}

  ngOnInit() {}

  ngOnChanges() {}

  toggleExpandGroup(group) {
    this.table.groupHeader.toggleExpandGroup(group);
  }

  trackByFn(item) {
    return item.id;
  }
}
