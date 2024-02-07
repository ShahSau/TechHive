import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,AbstractControl, Validators } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { user } from 'src/app/home/types/user.type';
import { UserService } from '../../../services/users/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  userSignupForm: FormGroup;
  alertMessage: string = '';
  alertType: number = 0; // 0-success, 1-warning, 2-error

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    },
    {
      validator: matchPasswords,
    }
    );
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  get username(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('username');
  }

  onSubmit(): void {
    const user: user = {
      firstName: this.firstName?.value,
      lastName: this.userSignupForm.get('lastName')?.value,
      address: this.userSignupForm.get('address')?.value,
      username: this.userSignupForm.get('username')?.value,
      email: this.userSignupForm.get('email')?.value,
      password: this.userSignupForm.get('password')?.value,
    };
    this.userService.createUser(user).subscribe({
      next: (result) => {
        console.log("RRRR",result);
        if (result === 'User created successfully!') {
          this.alertMessage = 'User created successfully';
          this.alertType = 0;
          this.router.navigate(['home/login']);
        } else if (result.message === 'Email already exists') {
          this.alertMessage = result.message;
          this.alertType = 1;
        }
      },
      error: (error) => {
        console.log("EEEE",error);
        this.alertMessage = error.error.message;
        this.alertType = 2;
      },
    });
  }
}
