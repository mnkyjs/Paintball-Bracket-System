import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldListComponent } from './components/field-list/field-list.component';

const routes: Routes = [
  {
    path: '',
    component: FieldListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldsRoutingModule {
}
