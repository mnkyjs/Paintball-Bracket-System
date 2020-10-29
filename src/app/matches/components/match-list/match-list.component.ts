import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldService } from 'src/app/paintballfields/services/field.service';
import { Field } from 'src/app/paintballfields/core/classes/field';
import { ScheduleService } from '../../services/schedule.service';
import { Schedule } from '../../core/classes/Schedule';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NameAndDate } from 'src/app/paintballfields/core/classes/nameAndDate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit, OnDestroy {
  // Observable workflow fix
  public subscription: Subscription = new Subscription();

  paintballfields: Field[];
  paintballfield: Field;
  matches: Schedule[] = [];
  dateAndName: NameAndDate;
  currentDate: Date;
  showSidebar = true;

  constructor(private fieldService: FieldService, private matchService: ScheduleService, private alert: AlertService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.fieldService.getFieldsWithMatches().subscribe((fields: Field[]) => {
        this.paintballfields = fields;
      })
    );
    this.currentDate = new Date();
  }

  onSelect(getDate: Date, getName: string): void {
    this.showSidebar = false;
    this.dateAndName = new NameAndDate();
    this.dateAndName.date = getDate;
    this.dateAndName.name = getName;
    console.time('get matches took')
    this.subscription.add(
      this.matchService.getMatchByDate(this.dateAndName).subscribe((res: Schedule[]) => {
        this.matches = res;
      })
    );
    console.timeEnd('get matches took')
  }

  deleteMatches() {
    this.subscription.add(
      this.matchService.deleteAllMatches().subscribe(
        () => {
          this.alert.success('DONE!');
          this.ngOnInit();
        },
        (error) => {
          this.alert.error(error);
        }
      )
    );
  }

  trackByFn(item) {
    return item.id;
  }
}
