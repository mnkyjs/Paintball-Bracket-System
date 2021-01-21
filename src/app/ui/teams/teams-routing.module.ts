import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';

const routes: Routes = [
	{
		path: '',
		component: TeamListComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TeamsRoutingModule {}
