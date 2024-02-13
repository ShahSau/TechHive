import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { UserService } from '../users/user-service.service';
import { Order, OrderItem } from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';


@Injectable()
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userservice: UserService
  ) {}
  saveOrder(deliveryAddress: DeliveryAddress): Observable<any> {
    

    //const url: string = 'https://estore-backend-9kay.onrender.com/api/orders/add';
    const url: string = 'http://localhost:5001/api/orders/add';
    
    const order:Order ={
      totalPrice: this.cartStore.cart.totalAmount,
      totalProducts: this.cartStore.cart.totalProducts,
      firstName: deliveryAddress.firstName,
      lastName: deliveryAddress.lastName,
      username: deliveryAddress.userName,
      email: deliveryAddress.email,
      address: deliveryAddress.address,
      orderItems: this.cartStore.cart.products,
      paymentMethod: 'Cash on Delivery',
      discount: false,
      orderDate: new Date().toISOString()

    }
    

    return this.httpClient.post(url, order, {
      headers: { authorization: this.userservice.token },
    });
  }
}
