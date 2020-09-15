import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaintballfieldViewComponent } from './components/paintballfield-view/paintballfield-view.component';
import { PaintballfieldListComponent } from './components/paintballfield-list/paintballfield-list.component';

const routes: Routes = [
  {
    path: '',
    component: PaintballfieldListComponent,
  },
  {
    path: 'paintballfield',
    component: PaintballfieldViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaintballfieldsRoutingModule {}
