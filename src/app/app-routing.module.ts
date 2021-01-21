import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { RootAdminGuard } from './shared/guards/root-admin.guard';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./ui/home/home.module').then((mod) => mod.HomeModule),
			},
			{
				path: 'admin',
				canActivate: [AuthGuard, RootAdminGuard],
				loadChildren: () => import('./ui/admin-area/admin-area.module').then((mod) => mod.AdminAreaModule),
			},
			{
				path: 'teams',
				loadChildren: () => import('./ui/teams/teams.module').then((mod) => mod.TeamsModule),
			},
			{
				path: 'matches',
				loadChildren: () => import('./ui/matches/matches.module').then((mod) => mod.MatchesModule),
			},
			{
				path: 'fields',
				loadChildren: () => import('./ui/paintballfields/fields.module').then((mod) => mod.FieldsModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
