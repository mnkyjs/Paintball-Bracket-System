import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchListComponent } from './components/match-list/match-list.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

const modules = [CommonModule, MatchesRoutingModule, MaterialModule];

@NgModule({
	declarations: [MatchListComponent],
	imports: [...modules, SharedModule],
})
export class MatchesModule {}
