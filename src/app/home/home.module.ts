import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { StartpageComponent } from './components/startpage/startpage.component';
import { FaqComponent } from './components/faq/faq.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [CommonModule, HomeRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [StartpageComponent, FaqComponent, RegisterComponent, LoginComponent],
  imports: [...modules]
})
export class HomeModule {
}
