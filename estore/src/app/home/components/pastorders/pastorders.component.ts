import { Component, OnInit, OnDestroy } from '@angular/core';
import {PastOrder} from '../../types/order.type'
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/users/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pastorders',
  templateUrl: './pastorders.component.html',
  styleUrls: ['./pastorders.component.scss']
})
export class PastordersComponent implements OnInit, OnDestroy {
  pastOrders: PastOrder;
  subscription: Subscription;
  totalPrices: number
  constructor(
    private orderService: OrderService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.orderService.getOrders(this.userService.loggedInUser.email).subscribe((orders) => {
      this.pastOrders = orders;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
