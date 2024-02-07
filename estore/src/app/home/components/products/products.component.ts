import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { Product } from '../../types/products.type';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;
  faTrash = faTrash;


  constructor(
    public productsStore: ProductsStoreItem,
    private cart: CartStoreItem,
    private router: Router,
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      
    }

    added: any = [
      this.cart.allProducts.map((product) => product.product.id)
    ];

    addToCart(product: Product) {
      this.cart.addProduct(product);
    }

    removeFromCart(product: Product) {
      this.cart.removeProductSingle(product);
      this.router.navigate(['./'], { relativeTo: this.route });
    }
}