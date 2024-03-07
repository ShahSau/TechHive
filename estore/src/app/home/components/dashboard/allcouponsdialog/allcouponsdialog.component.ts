import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/home/services/users/user-service.service';

@Component({
  selector: 'app-allcouponsdialog',
  templateUrl: './allcouponsdialog.component.html',
  styleUrls: ['./allcouponsdialog.component.scss'],
  //standalone: true,
  // imports: [MatDialogModule, MatButtonModule],
})
export class AllcouponsdialogComponent implements OnInit, OnDestroy {

  couponForm: FormGroup;
  subscriptions:Subscription = new Subscription();
  coupon:any
  constructor(
    private userService: UserService,
    private fb: FormBuilder, 
  ) {
    this.coupon = {
      name: '',
      discount: 0,
      expiryDate: new Date(),
    }
  }

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name: [''],
      discount: [''],
      expiry: [''],
    });
  }

  get name() {
    return this.couponForm.get('name');
  }

  get discount() {
    return this.couponForm.get('discount');
  }

  get expiryDate() {
    return this.couponForm.get('expiry');
  }

  onSubmit():void {
    this.subscriptions.add(
      this.userService.addCoupon(this.couponForm.value).subscribe((res: any) => {
        
      })
    )

  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
