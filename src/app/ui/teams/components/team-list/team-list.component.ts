import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateScheduleDto, FieldDto, PlanerService, TeamDto } from '../../../../api/services/planer-api.service';
import { TeamViewComponent } from '../team-view/team-view.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  public isLinear = true;
  teams!: TeamDto[];
  fieldDtos!: FieldDto[];
  team!: TeamDto;
  selected = [];
  temp = [];
  selectionType = SelectionType;

  scheduleToCreate: CreateScheduleDto = {} as CreateScheduleDto;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(
    public planerService: PlanerService,
    private _alert: AlertService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.loadDependecies();
    this.scheduleToCreate.addClashToAnExistingOne = false;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [new FormControl(new Date().toISOString()), Validators.required],
      thirdCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  loadDependecies(): void {
    this.planerService.getListOfAllFields().subscribe(
      (fields: FieldDto[]) => {
        this.fieldDtos = fields;
      },
      (error: any) => {
        this._alert.error(error);
      }
    );
    this.planerService.getListOfAllTeams().subscribe((teams: TeamDto[]) => {
      this.teams = teams;
      // @ts-ignore
      this.temp = [...this.teams];
    });
  }

  onReset(): void {
    this.firstFormGroup.controls[`firstCtrl`].setValidators([Validators.required]);
    this.selected.length = 0;
    this.updateFormGroup();
  }

  onSelect({ selected }: any): void {
    this.selected.splice(0, this.selected.length);
    // @ts-ignore
    this.selected.push(...selected);
    if (this.selected.length > 0) {
      this.firstFormGroup.controls[`firstCtrl`].setValidators(null);
    } else {
      this.firstFormGroup.controls[`firstCtrl`].setValidators([Validators.required]);
    }

    this.updateFormGroup();
  }

  updateFormGroup(): void {
    this.firstFormGroup.controls[`firstCtrl`].updateValueAndValidity();
  }

  onActivate(): void {
  }

  add(): void {
    console.log('Not implemented');
  }

  update(): void {
    console.log('Not implemented');
  }

  remove(): void {
    console.log('Not implemented');
  }

  displayCheck(row: any): boolean {
    return row.name !== 'Ethel Price';
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();

    this.teams = this.temp.filter((d) => {
      // @ts-ignore
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  onCreate(): void {
    this.team = {} as TeamDto;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      username: '',
      team: this.team
    };

    const dialogRef = this._dialog.open(TeamViewComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.team = result;
      this.ngOnInit();
    });
  }

  onEdit(id: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      username: '',
      team: this.getTeamById(id)
    };
    const dialogRef = this._dialog.open(TeamViewComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.team = result;
      this.ngOnInit();
    });
  }

  onDelete(id: number): void {
    this.planerService.deleteTeam(id).subscribe(
      () => {
        this._alert.success('Erfolgreich gelöscht');
        this.ngOnInit();
      },
      (error) => {
        this._alert.error(error);
      }
    );
  }

  postSchedule(): void {
    this.scheduleToCreate.paintballfieldId = this.secondFormGroup.get('thirdCtrl')?.value;
    this.scheduleToCreate.date = this.secondFormGroup.get('secondCtrl')?.value;
    this.scheduleToCreate.name = this.thirdFormGroup.get('fourthCtrl')?.value;
    if (this.selected.length > 1 && this.scheduleToCreate.date != null && this.scheduleToCreate.name !== undefined) {
      const teamsForApi: TeamDto[] = [];
      for (const tempTeam of this.selected) {
        for (const team of this.teams) {
          // @ts-ignore
          if (team.id === tempTeam.id) {
            teamsForApi.push(team);
          }
        }
      }

      this.scheduleToCreate.teams = teamsForApi;
      this.planerService.createSchedule(this.scheduleToCreate).subscribe(
        () => {
          this._alert.success('Erstellt!');
          this.firstFormGroup.controls[`firstCtrl`].setValidators([Validators.required]);
          this.updateFormGroup();
        },
        () => {
          this._alert.error('Da lief was schief');
        }
      );
    } else if (this.selected.length < 1) {
      this._alert.error('Wähle mehr als ein Team aus!');
    } else if (this.scheduleToCreate.date == null) {
      this._alert.error('Wähle ein Datum aus!');
    } else if (this.scheduleToCreate.name === undefined || this.scheduleToCreate.name === '') {
      this._alert.error('Anzeigename für den Clash wird benötigt');
    }
  }

  // @ts-ignore
  private getTeamById(id: number): TeamDto {
    const team = this.teams.find((value) => value.id === id);
    if (team) {
      return team;
    }
  }

  loggedIn(): boolean {
    return this._authService.loggedIn();
  }

  trackByFn(item: any): number {
    return item.id;
  }
}
