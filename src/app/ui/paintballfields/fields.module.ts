import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldsRoutingModule } from './fields-routing.module';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FieldViewComponent } from './components/field-view/field-view.component';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [CommonModule, FieldsRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule];

@NgModule({
	declarations: [FieldListComponent, FieldViewComponent],
	imports: [...modules],
})
export class FieldsModule {}
