import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamViewComponent } from './components/team-view/team-view.component';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent,
  },
  {
    path: 'team',
    component: TeamViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
