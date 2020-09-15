import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { RegisterComponent } from './components/register/register.component';
import { FaqComponent } from './components/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  // {
  //     path: 'register',
  //     component: RegisterComponent,
  // },
  {
    path: 'faq',
    component: FaqComponent,
  },
  // {
  //     path: 'faq/:token',
  //     component: FaqComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
