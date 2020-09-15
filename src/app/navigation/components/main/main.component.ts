import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/shared/core/enums/role.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  model: any = {};
  userRole: UserRole;
  roleObj = UserRole;
  rootAdmin = UserRole.RootAdmin;

  constructor(public authService: AuthService, private alert: AlertService, private router: Router) {}

  ngOnInit() {
    this.userRole = +this.authService.decodedToken.role;
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alert.success(`Willkommen ${this.authService.decodedToken.unique_name}`);
        this.userRole = this.authService.decodedToken.role;
      },
      (error) => {
        this.alert.error(error);
      },
      () => {
        this.router.navigate(['/teams']);
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    localStorage.removeItem('token');
    this.alert.message('Ausgeloggt!');
    this.router.navigate(['/home']);
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
