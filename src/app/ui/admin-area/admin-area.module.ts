import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { MaterialModule } from '../../shared/material.module';

const modules = [CommonModule, AdminAreaRoutingModule, MaterialModule];

@NgModule({
	declarations: [UserListComponent, UserViewComponent],
	imports: [...modules],
})
export class AdminAreaModule {}
