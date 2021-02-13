import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamListComponent } from './components/team-list/team-list.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { NgxModule } from '../shared/ngx.module';

const modules = [CommonModule, TeamsRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule, NgxModule];

@NgModule({
  declarations: [TeamListComponent, TeamViewComponent],
  imports: [...modules]
})
export class TeamsModule {
}
