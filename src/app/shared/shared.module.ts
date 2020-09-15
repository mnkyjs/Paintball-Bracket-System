import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HasRoleDirective } from './directives/hasRole.directive';

@NgModule({
  declarations: [HasRoleDirective],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HasRoleDirective],
})
export class SharedModule {}
