import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { roles: ['RootAdmin'] },
  },
  {
    path: 'user',
    component: UserViewComponent,
  },
  {
    path: 'dialog',
    component: ConfirmationDialogComponent,
  },
  {
    path: 'edit',
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
