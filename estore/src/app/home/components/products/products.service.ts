import { Injectable } from '@angular/core';
import { ProductListItem } from './products.type';
import { products } from './products.data';

@Injectable()
// root is removed as this service is provided in the product component only
export class ProductsService {
  getProductsList(): ProductListItem[] {
    return products;
  }
}
