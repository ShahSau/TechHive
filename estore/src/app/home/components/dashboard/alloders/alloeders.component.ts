import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/home/services/order/order.service';

@Component({
  selector: 'app-alloeders',
  templateUrl: './alloeders.component.html',
  styleUrls: ['./alloeders.component.scss']
})
export class AlloedersComponent implements OnInit, OnDestroy {

  subscriptions: any = new Subscription();
  orders: any[] = [];
  constructor(
    private orderService: OrderService
  ) { }

  allOrders(): void {
    this.subscriptions.add(
      this.orderService.getOrdersForAdmin().subscribe((orders) => {
        this.orders = orders;
        console.log(this.orders);
      })
    );
  }

  ngOnInit(): void {
    this.allOrders();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
