import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  panelOpenState = true;
  color: ThemePalette = 'accent';
  currentUser: any;
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  constructor(private _breakpointObserver: BreakpointObserver, private _authService: AuthService) {
  }

  ngOnInit(): void {
    if (Object.keys(this._authService.getTokenInfo()).length !== 0) {
      this.currentUser = this._authService.getTokenInfo();
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
