import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/home/services/users/user-service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AllcouponsdialogComponent } from '../allcouponsdialog/allcouponsdialog.component';

@Component({
  selector: 'app-allcoupons',
  templateUrl: './allcoupons.component.html',
  styleUrls: ['./allcoupons.component.scss']
})
export class AllcouponsComponent implements OnInit, OnDestroy {

  subscriptions: any = new Subscription()
  coupons: any[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  openDialog() {
    const dialogRef = this.dialog.open(AllcouponsdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.allCoupons();
      console.log(`Dialog result: ${result}`);
    });
  }

  allCoupons(): void {
    this.subscriptions.add(
      this.userService.getAllCoupons().subscribe((coupons) => {
        this.coupons = coupons.coupons;
        console.log(this.coupons);
      })
    );
  }

  ngOnInit(): void {
    this.allCoupons();
  }

  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
