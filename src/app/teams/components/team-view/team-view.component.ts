import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss'],
})
export class TeamViewComponent implements OnInit, OnDestroy {
  // Observable workflow fix
  public subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<TeamViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teamService: TeamService,
    private alert: AlertService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}

  create() {
    if (this.teamService.form.valid) {
      if (!this.teamService.form.get('id').value) {
        this.subscription.add(
          this.teamService.postTeam(this.teamService.form.value).subscribe(
            (res) => {
              this.alert.success(`Team ${res.name} wurde erstellt`);
            },
            (error) => {
              this.alert.error(error);
            }
          )
        );
      } else {
        this.subscription.add(
          this.teamService.putTeam(this.teamService.form.value).subscribe(
            (res) => {
              this.alert.success(`Team ${res.name} wurde bearbeitet`);
            },
            (error) => {
              this.alert.error(error);
            }
          )
        );
      }
    }
    this.onNoClick();
  }

  onNoClick(): void {
    this.teamService.form.reset();
    this.dialogRef.close();
  }
}
