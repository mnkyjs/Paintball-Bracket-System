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

    for (const item of this.splitArrayForLeftSide) {
      console.log(` Array left ${item[0].name} vs ${item[1].name}`);
    }
    for (const item of this.splitArrayForRightSide) {
      console.log(` Array right ${item[0].name} vs ${item[1].name}`);
    }
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
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      let imgWidth = 300;
      let pageHeight = 295;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = 10;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
  trackByFn(item) {
    return item.id;
  }
}
