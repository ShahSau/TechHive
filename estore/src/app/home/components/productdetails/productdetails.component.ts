import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/product/products.service';
import { Product } from '../../types/products.type';
import { Subscription } from 'rxjs';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit, OnDestroy {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  comments: string = '';
  product: Product;
  subscriptions: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cart: CartStoreItem
  ) {}

  productDeatis (): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = product[0];
      })
    );
  }

  ngOnInit(): void {
    this.productDeatis();
  }

  countStar(star:number) {
    
    this.selectedValue = star;
    this.productDeatis();
  }

  onCommentChange(value: any) {
    const user = localStorage.getItem('user');
    this.subscriptions.add(
      this.productsService.commentOnProduct(this.product.id, value, user, this.selectedValue).subscribe({
        next: (data) => {
          this.comments = '';
          this.selectedValue = 0;
          this.productDeatis();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      })
    );
  }

  addToCart(){
    this.cart.addProduct(this.product); 
  }

  removeFromCart(){
    this.cart.removeProductSingle(this.product);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
