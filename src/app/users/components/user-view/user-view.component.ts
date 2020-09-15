import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Schedule } from 'src/app/matches/core/classes/Schedule';
import { NameAndDate } from 'src/app/paintballfields/core/classes/nameAndDate';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ScheduleService } from 'src/app/matches/services/schedule.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthUser } from '../../core/classes/user';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  matches: Schedule[];
  dateAndName: NameAndDate;
  panelOpenState = false;
  currentUser: AuthUser;

  teamArea: FormGroup;

  constructor(
    private userService: UserService,
    private matchService: ScheduleService,
    public dialog: MatDialog,
    private alert: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getMatchesByCurrentUser();
  }

  getMatchesByCurrentUser() {
    this.userService.getMatches().subscribe((resMatches: Schedule[]) => {
      this.matches = resMatches;
    });
  }

  getCurrentUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe((user: AuthUser) => {
      this.currentUser = user;
    });
  }

  trackByFn(item) {
    return item.id;
  }

  onSelect(getDate: Date, getName: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Möchtest du den Spielplan "${getName}" löschen?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dateAndName = new NameAndDate();
        this.dateAndName.date = getDate;
        this.dateAndName.name = getName;
        this.matchService.deleteMatchesForCurrentUser(this.dateAndName).subscribe(
          (res) => {
            this.alert.success(`${getName} wurde erfolgreich gelöscht`);
            this.ngOnInit();
          },
          (error) => {
            this.alert.error(error);
          }
        );
      }
    });
  }

  postUser() {
    this.userService.putUser(this.currentUser).subscribe(
      (result) => {
        this.alert.success(`${this.currentUser.userName} wurde erfolgreich bearbeitet`);
        this.ngOnInit();
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }

  onDeleteAll(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: `Möchtest du alle je erstellten Spielpläne von dir wirklich löschen?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.matchService.deleteAllMatches().subscribe(
          (res) => {
            this.alert.success(`Alle Einträge wurden erfolgreich gelöscht`);
            this.ngOnInit();
          },
          (error) => {
            this.alert.error(error);
          }
        );
      }
    });
  }
}
