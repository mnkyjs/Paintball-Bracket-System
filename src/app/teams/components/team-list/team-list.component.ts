import { Component, OnInit, ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Team } from '../../core/classes/team';
import { Field } from 'src/app/paintballfields/core/classes/field';
import { Schedule } from 'src/app/matches/core/classes/Schedule';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TeamService } from '../../services/team.service';
import { ScheduleService } from 'src/app/matches/services/schedule.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TeamViewComponent } from '../team-view/team-view.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FieldService } from 'src/app/paintballfields/services/field.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  public isLinear = true;
  teams: Team[];
  paintballfield: Field[];
  team: Team;
  selected = [];
  temp = [];

  scheduleToCreate: Schedule = new Schedule();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    public teamService: TeamService,
    private alert: AlertService,
    public scheduleService: ScheduleService,
    private fieldService: FieldService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loadDependecies();
    this.scheduleToCreate.addClashToAnExistingOne = false;
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: [new FormControl(new Date().toISOString()), Validators.required],
      thirdCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
  }

  loadDependecies() {
    this.fieldService.getField().subscribe(
      (fields: Field[]) => {
        this.paintballfield = fields;
      },
      (error) => {
        this.alert.error(error);
      }
    );
    this.teamService.getTeamForList().subscribe((teams: Team[]) => {
      this.teams = teams;
      this.temp = [...this.teams];
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    if (this.selected.length > 0) {
      this.firstFormGroup.controls['firstCtrl'].setValidators(null);
    } else {
      this.firstFormGroup.controls['firstCtrl'].setValidators([Validators.required]);
    }

    this.firstFormGroup.controls['firstCtrl'].updateValueAndValidity();
  }

  onActivate(event) {}

  add() {
    // console.log('Not implemented');
  }

  update() {
    // console.log('Not implemented');
  }

  remove() {
    // console.log('Not implemented');
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.teams = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onCreate() {
    this.team = new Team();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      username: '',
      team: this.team,
    };

    const dialogRef = this.dialog.open(TeamViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.team = result;
      this.ngOnInit();
    });
  }

  onEdit(value) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.team = this.findTeam(value);
    dialogConfig.data = {
      username: '',
      team: this.team,
    };
    const dialogRef = this.dialog.open(TeamViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.team = result;
      this.ngOnInit();
    });
  }

  onDelete(id: number) {
    this.teamService.deleteTeam(id).subscribe(
      () => {
        this.alert.success('Erfolgreich gelöscht');
        this.ngOnInit();
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }

  findTeam(teamId: number): Team {
    const getTeam = this.teams.find((x) => x.id === teamId);
    if (getTeam !== undefined) {
      return getTeam;
    }
  }

  postSchedule() {
    this.scheduleToCreate.paintballFieldId = this.secondFormGroup.get('thirdCtrl').value;
    this.scheduleToCreate.date = this.secondFormGroup.get('secondCtrl').value;
    this.scheduleToCreate.name = this.thirdFormGroup.get('fourthCtrl').value;
    if (this.selected.length > 1 && this.scheduleToCreate.date != null && this.scheduleToCreate.name !== undefined) {
      const teamsForApi: Team[] = [];
      for (const tempTeam of this.selected) {
        for (const team of this.teams) {
          if (team.id === tempTeam.id) {
            teamsForApi.push(team);
          }
        }
      }

      this.scheduleToCreate.teams = teamsForApi;

      this.scheduleService.postSchedule(this.scheduleToCreate).subscribe(
        (response) => {
          this.alert.success('Erstellt!');
          this.ngOnInit();
        },
        (error) => {
          this.alert.error('Da lief was schief');
        }
      );
    } else if (this.selected.length < 1) {
      this.alert.error('Wähle mehr als ein Team aus!');
    } else if (this.scheduleToCreate.date == null) {
      this.alert.error('Wähle ein Datum aus!');
    } else if (this.scheduleToCreate.name === undefined || this.scheduleToCreate.name === '') {
      this.alert.error('Anzeigename für den Clash wird benötigt');
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  trackByFn(item) {
    return item.id;
  }

  public log(item: any) {
    // console.log(`Logger: ${item}`);
  }
}
