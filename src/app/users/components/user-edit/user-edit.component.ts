import { Component, OnInit, Inject } from '@angular/core';
import { UserViewComponent } from '../user-view/user-view.component';
import { UserService } from '../../services/user.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/shared/core/enums/role.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  roles = UserRole;

  tempRole: UserRole;

  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.data.user.id, []),
      userName: new FormControl(this.data.user.userName, [Validators.required, Validators.minLength(2)]),
      roleNames: new FormControl(this.data.user.roles, []),
      teamName: new FormControl(this.data.user.teamName, []),
      created: new FormControl(this.data.user.created, []),
    });
  }

  trackByFn(item) {
    return item.id;
  }

  create() {
    if (this.userForm.valid) {
      const editUserName = this.userForm.get('userName').value;
      if (!this.userForm.get('id').value) {
        this.userService.putRoles(this.userForm.value, this.userForm.get('roleNames').value).subscribe(
          (res) => {
            this.alert.success(`User ${res.userName} wurde erstellt`);
          },
          (error) => {
            this.alert.error(error);
          }
        );
      } else {
        this.userService.putRoles(this.userForm.value, this.userForm.get('roleNames').value).subscribe(
          (res) => {
            this.alert.success(`User ${editUserName} wurde bearbeitet`);
          },
          (error) => {
            this.alert.error(error);
          }
        );
      }
    }
    this.onNoClick();
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.data.user.roles.push(option);
    } else {
      for (let i = 0; i < this.data.user.roles.length; i++) {
        if (this.data.user.roles[i] === option) {
          this.data.user.roles.splice(i, 1);
        }
      }
    }
  }

  onNoClick(): void {
    this.userService.form.reset();
    this.dialogRef.close();
  }
}
