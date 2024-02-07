import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/home/services/users/user-service.service';
import { loginToken } from 'src/app/home/types/user.type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  userLoginForm: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }
  
  onSubmit(): void {
    this.userService.login(this.email?.value, this.password?.value).subscribe({
      next: (result: loginToken) => {
        this.userService.activateToken(result);
        this.alertType = 0;
        this.alertMessage = 'Login successful';
        this.router.navigate(['home/products']);
      },
      error: (error) => {
        this.alertType = 2;
        this.alertMessage = error.error.message;
      },
    });
  }

}


{
  /*

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzNiZTc0MTA1ODExZjA0NWQzNjJjZiIsImlhdCI6MTcwNzMzMDQ0NSwiZXhwIjoxNzA3MzM0MDQ1fQ.wVwR8ookxxIoZaeQ50LUxUbvTlOZ-5MGV1Y5BOTGjDI",
    "user": {
        "_id": "65c3be74105811f045d362cf",
        "username": "test2",
        "email": "test2@test.com",
        "favorites": [],
        "firstName": "testfirst",
        "lastName": "testSecond",
        "address": "Tampere, Finland",
        "role": "user",
        "createdAt": "2024-02-07T17:31:32.859Z",
        "updatedAt": "2024-02-07T17:31:32.859Z",
        "__v": 0
    },
    "expiresInSeconds": 3600
}
  */
}