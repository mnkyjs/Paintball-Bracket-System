import { Component, OnInit, ViewChild } from '@angular/core';
import { User, AuthUser } from '../../core/classes/user';

import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserRole } from 'src/app/shared/core/enums/role.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: AuthUser[];
  user: AuthUser;
  displayedColumns: string[] = ['name', 'role', 'created', 'team', 'action'];
  dataSource: MatTableDataSource<User>;

  roles = UserRole;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private userSerive: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.userSerive.getAllUsers().subscribe(
      (users: AuthUser[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  onEdit(rowId) {
    // TODO here is the storage for the current role of the user
    // this.teamService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.user = this.findUser(rowId);
    dialogConfig.data = {
      nickname: this.authService.decodedToken.unique_name,
      user: this.user,
      roles: this.getRolesArray(this.user),
    };
    const dialogRef = this.dialog.open(UserEditComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
      this.ngOnInit();
    });
  }

  private getRolesArray(user: AuthUser) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'RootAdmin', value: 'RootAdmin' },
      { name: 'Member', value: 'Member' },
      { name: 'Moderator', value: 'Moderator' },
    ];

    for (const element of availableRoles) {
      let isMatch = false;
      for (const role of userRoles) {
        if (element.name === role) {
          isMatch = true;
          element.checked = true;
          roles.push(element);
          break;
        }
      }
      if (!isMatch) {
        element.checked = false;
        roles.push(element);
      }
    }
    return roles;
  }

  onDelete(id: number) {
    this.userSerive.deleteUser(id).subscribe(
      () => {
        this.alert.success('User gelöscht');
        this.refresh();
      },
      (error) => {
        this.alert.error(error);
      }
    );
  }

  findUser(userId: number): AuthUser {
    const getUser = this.users.find((x) => x.id === userId);
    if (getUser !== undefined) {
      return getUser;
    }
  }
}
