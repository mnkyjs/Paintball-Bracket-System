import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const modules = [CommonModule, NgxDatatableModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class NgxModule {
}
