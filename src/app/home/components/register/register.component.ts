import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { User } from 'src/app/users/core/classes/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: User = new User();
  nickname: string;

  constructor(private authService: AuthService, private alert: AlertService) {}

  ngOnInit() {}

  register(f: NgForm) {
    const spambotcheck = f.controls['nickname'].value;
    if (spambotcheck === undefined || spambotcheck === '') {
      this.authService.register(this.model).subscribe(
        () => {
          this.alert.success(`${this.model.userName}, du wurdest erfolgreich angelegt!`);
        },
        (error) => {
          this.alert.error(error);
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
