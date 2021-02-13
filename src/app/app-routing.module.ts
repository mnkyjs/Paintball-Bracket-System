import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RootAdminGuard } from './shared/guards/root-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then((mod) => mod.HomeModule)
      },
      {
        path: 'admin',
        canActivate: [AuthGuard, RootAdminGuard],
        loadChildren: () => import('./admin-area/admin-area.module').then((mod) => mod.AdminAreaModule)
      },
      {
        path: 'teams',
        loadChildren: () => import('./teams/teams.module').then((mod) => mod.TeamsModule)
      },
      {
        path: 'matches',
        loadChildren: () => import('./matches/matches.module').then((mod) => mod.MatchesModule)
      },
      {
        path: 'fields',
        loadChildren: () => import('./paintballfields/fields.module').then((mod) => mod.FieldsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
