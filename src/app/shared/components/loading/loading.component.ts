import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
	@Input() public visible: boolean;

	constructor() {
		this.visible = false;
	}
}
