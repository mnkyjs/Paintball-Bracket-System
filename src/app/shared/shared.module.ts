import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HasRoleDirective } from './directives/has-role.directive';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './material.module';
import { AlertService } from './services/alert.service';

const modules = [CommonModule, SharedRoutingModule, MaterialModule];

const services = [
  AlertService
];

const directives = [
  HasRoleDirective
];

@NgModule({
  declarations: [...directives, LayoutComponent, LoadingComponent],
  imports: [...modules],
  exports: [LoadingComponent],
  providers: [...services]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...directives, ...services]
    };
  }
}
