import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'matches',
    loadChildren: () => import('./matches/matches.module').then((mod) => mod.MatchesModule),
  },

  {
    path: 'locations',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    loadChildren: () => import('./locations/locations.module').then((mod) => mod.LocationsModule),
  },
  {
    path: 'paintballfields',
    loadChildren: () => import('./paintballfields/paintballfields.module').then((mod) => mod.PaintballfieldsModule),
  },
  {
    path: 'teams',
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./teams/teams.module').then((mod) => mod.TeamsModule),
  },
  {
    path: 'users',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then((mod) => mod.UsersModule),
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
