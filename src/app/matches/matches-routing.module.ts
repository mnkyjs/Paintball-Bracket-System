import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchViewComponent } from './components/match-view/match-view.component';
import { MatchListComponent } from './components/match-list/match-list.component';

const routes: Routes = [
  {
    path: '',
    component: MatchListComponent,
  },
  {
    path: 'match',
    component: MatchViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesRoutingModule {}
