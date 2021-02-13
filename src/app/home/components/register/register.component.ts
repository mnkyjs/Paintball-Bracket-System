import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    this._authService.register(this.registerForm.value).subscribe((res) => {
      this._alert.success('Angemeldet');
      this._router.navigate(['/teams']);
    });
  }
}
