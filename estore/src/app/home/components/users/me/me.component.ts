import { Component,OnDestroy, OnInit } from '@angular/core';
import { loggedInUser } from 'src/app/home/types/user.type';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/home/services/users/user-service.service';
@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})

export class MeComponent implements OnInit, OnDestroy{

  constructor(private fb: FormBuilder, private userService:UserService) { }

  userForm: FormGroup;

  loggedInUser: loggedInUser;
   


  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
    this.userForm = this.fb.group({
      firstName : [this.loggedInUser.firstName, Validators.required],
      lastName : [this.loggedInUser.lastName, Validators.required],
      username : [this.loggedInUser.username, Validators.required],
      email: [this.loggedInUser.email, [Validators.required, Validators.email]],
      address: [this.loggedInUser.address, Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    });
  }

  get firstName(): AbstractControl<any, any> | null {
    return this.userForm.get('firstName');
  }

  get lastName(): AbstractControl<any, any> | null {
    return this.userForm.get('lastName');
  }

  get address(): AbstractControl<any, any> | null {
    return this.userForm.get('address');
  }

  get email(): AbstractControl<any, any> | null {
    return this.userForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userForm.get('password');
  }

  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userForm.get('confirmPassword');
  }

  get username(): AbstractControl<any, any> | null {
    return this.userForm.get('username');
  }



  ngOnDestroy(): void {
  }

  onsubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const updatedUser: any = {
      firstName: this.firstName?.value || this.loggedInUser.firstName,
      lastName: this.lastName?.value || this.loggedInUser.lastName,
      address: this.userForm.get('address')?.value,
      username: this.username?.value || this.loggedInUser.username,
      email: this.email?.value || this.loggedInUser.email,
      password: this.password?.value || '',
    };
    console.log(updatedUser);
    this.userService.updateUserInfo(updatedUser).subscribe({
      next: (result) => {
        if (result.message === 'User has been updated') {
          this.loggedInUser = updatedUser;
          localStorage.setItem('user', JSON.stringify(this.loggedInUser));
          // this.userForm.reset();
        }
      },
      error: (error) => {
          
          console.error('There was an error!', error);
      },
      
    });
  }
}
