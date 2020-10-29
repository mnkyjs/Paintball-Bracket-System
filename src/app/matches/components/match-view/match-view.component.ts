import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ScheduleService } from '../../services/schedule.service';
import { Input } from '@angular/core';
import { Schedule } from '../../core/classes/Schedule';
import { OnChanges } from '@angular/core';
import { AuthUser } from 'src/app/users/core/classes/user';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss'],
})
export class MatchViewComponent implements OnInit, OnChanges {
  @Input() matches: Schedule[];
  @Input() showButton: boolean;
  // matches: any;
  public responseMatches: any[] = [];
  public splitArrayForLeftSide = [];
  public splitArrayForRightSide = [];

  smallMatch: Schedule;
  author: AuthUser;
  scale = 0.8;

  constructor(public service: ScheduleService, private alert: AlertService) {}

  ngOnInit() {
    // this.getMatchByDate();
    this.pushTempMatches();
    this.getAuthor();
    this.splitMatches();
  }

  ngOnChanges() {
    this.responseMatches = [];
    this.pushTempMatches();
    this.getAuthor();
    this.splitMatches();
  }

  getAuthor() {
    if (this.matches.length > 0) {
      for (const item of this.matches) {
        if (item[0].user.username !== undefined && this.author === undefined) {
          this.author = item[0].user;
        }
      }
    }
  }

  public splitMatches() {
    this.splitArrayForLeftSide = this.matches.slice(0, this.matches.length / 2);
    this.splitArrayForRightSide = this.matches.slice(this.matches.length / 2, this.matches.length);
  }

  pushTempMatches() {
    if (this.matches.length > 2) {
      const tempMatch = [];
      for (const item of this.matches) {
        if (tempMatch.length <= 0) {
          tempMatch.push(item);
        } else {
          this.responseMatches.push(tempMatch[0].concat(item));
          tempMatch.length = 0;
        }
      }
    }
  }

  captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 500;
      const pageHeight = 500;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = 10;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    });
  }
  trackByFn(item) {
    return item.id;
  }
}
