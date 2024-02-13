import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem, DeliveryAddress } from '../../types/cart.type';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user-service.service';
import { Subscription } from 'rxjs';
import { loggedInUser} from '../../types/user.type'
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  faTrash = faTrash;
  user: loggedInUser;
  subscriptions:Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;


  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.user ={
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      username: ''
    }
    this.subscriptions.add(
      userService.loggedInUser$.subscribe((loggedUser) => {
        if (loggedUser.firstName) {
          this.user = loggedUser;
        }
      })
    );
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      address: [this.user.address, Validators.required],
      userName: [this.user.username, Validators.required],

    });
  }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  onSubmit(): void {
    if(this.userService.isUserAuthenticated){
      this.disableCheckout = false;
      const deliveryAddress: DeliveryAddress = this.orderForm.value;

      this.subscriptions.add(
        this.orderService
        .saveOrder(deliveryAddress)
        .subscribe({
          next: (res) => {
            
            this.alertType = 0;
            this.alertMessage = 'Order Placed Successfully';
            this.cartStore.clearCart();
            this.orderForm.reset();
          },
          error: (error) => {
            
            this.alertType = 2;
            this.alertMessage = 'Error Occured while placing order';
          },
        })
      );

    }
    this.disableCheckout = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
