import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/product/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../types/products.type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favourities',
  templateUrl: './favourities.component.html',
  styleUrls: ['./favourities.component.scss']
})
export class FavouritiesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  products: Product[] = [];

  constructor(
    private ProductsService: ProductsService,
    private router: Router,
    ) { }

  favourities(): void {
    this.subscriptions.add(
      this.ProductsService.getFavourites().subscribe((products) => {
        this.products = products;
      })
    );
  }
  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  ngOnInit(): void {
    this.favourities();
  }

  ngOnDestroy(): void {
   this.subscriptions.unsubscribe();
  }

}
