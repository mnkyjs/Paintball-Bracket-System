import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../core/classes/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: [],
})
export class AddUserComponent implements OnInit {
  public newUser = {} as User;
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.authService.register(this.newUser).subscribe((res) => {
      if (res) {
        this.alertService.success(`Nutzer: ${this.newUser.userName} hinzugefügt.`);
        this.dialogRef.close();
      }
    });
  }
}
