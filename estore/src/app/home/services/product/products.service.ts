import { Injectable } from '@angular/core';
import { Product } from '../../types/products.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
// root is removed as this service is provided in the product component only
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(query?: string): Observable<Product[]> {
  //   return this.http.get<Product[]>('http://localhost:5001/api/products/all');
  // }
  let url: string = 'http://localhost:5001/api/products/all';
    if (query) {
      url += '?' + query;
    }
    return this.httpClient.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product[]> {
    const url: string = 'http://localhost:5001/api/products/' + id;
    return this.httpClient.get<Product[]>(url);
  }
}

