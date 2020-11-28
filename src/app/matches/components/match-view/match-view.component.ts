import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScheduleService } from '../../services/schedule.service';
import { Input } from '@angular/core';
import { Schedule } from '../../core/classes/Schedule';
import { OnChanges } from '@angular/core';
import { AuthUser } from 'src/app/users/core/classes/user';
import { Matches } from '../../core/classes/matches';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss'],
})
export class MatchViewComponent implements OnInit, OnChanges {
  @Input() matches: Matches[];
  @Input() showButton: boolean;

  constructor(public service: ScheduleService, private alert: AlertService) {}

  ngOnInit() {}

  ngOnChanges() {}

  trackByFn(item) {
    return item.id;
  }
}
