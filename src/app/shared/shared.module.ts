import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HasRoleDirective } from './directives/has-role.directive';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './material.module';

const modules = [CommonModule, SharedRoutingModule, MaterialModule];

@NgModule({
	declarations: [HasRoleDirective, LayoutComponent, LoadingComponent],
	imports: [...modules],
	exports: [LoadingComponent],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule,
			providers: [HasRoleDirective],
		};
	}
}
