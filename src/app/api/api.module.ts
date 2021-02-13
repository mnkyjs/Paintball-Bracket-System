import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanerService } from './services/planer-api.service';

const modules = [CommonModule];

const services = [PlanerService];

@NgModule({
  declarations: [],
  imports: [...modules],
  providers: [...services]
})
export class ApiModule {
}
