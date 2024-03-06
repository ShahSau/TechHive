import { Injectable } from '@angular/core';
import { Product } from '../../types/products.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../users/user-service.service';

@Injectable()
// root is removed as this service is provided in the product component only
export class ProductsService {
  constructor(
    private httpClient: HttpClient, 
     private userservice: UserService
     ) {}

  getAllProducts(query?: string): Observable<Product[]> {
  //   return this.http.get<Product[]>('http://localhost:5001/api/products/all');
  // }
  // let url: string = 'https://estore-backend-9kay.onrender.com/api/products/all';
    let url: string = 'http://localhost:5001/api/products/all';
    if (query) {
      url += '?' + query;
    }
    return this.httpClient.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product[]> {
    //const url: string = 'https://estore-backend-9kay.onrender.com/api/products/' + id;
    const url: string = 'http://localhost:5001/api/products/' + id;
    return this.httpClient.get<Product[]>(url);
  }

  commentOnProduct(id: number, comment: string, user:any, star:number): Observable<any> {
    //const url: string = 'https://estore-backend-9kay.onrender.com/api/products/' + id + '/comment';
    // const url: string = 'http://localhost:5001/api/products/' + id + '/comment';
    // return this.httpClient.post(url, { comment });
    user = JSON.parse(user);
    const url: string = 'http://localhost:5001/api/products/update-comment';
    const newcomment = {
      id: id,
      comment: {
        commenter: user.username,
        comment: comment,
        rating:star
      }
    }
    return this.httpClient.post(url, newcomment, {
      headers: { authorization: this.userservice.token },
    });
  }

  addToFavourites(id:number): Observable<any> {
    const url: string = 'http://localhost:5001/api/auth/favroute';
    const productId  = {
      productId: id
    }
    return this.httpClient.post(url, productId, {
      headers: { authorization: this.userservice.token },
    });
  }

  removeFromFavourites(id:number): Observable<any> {
    const url: string = 'http://localhost:5001/api/auth/unfavroute';
    const productId  = {
      productId: id
    }
    return this.httpClient.post( url,productId, {
      headers: { authorization: this.userservice.token }
    });
  }

  getFavourites(): Observable<any> {
    const url: string = 'http://localhost:5001/api/auth/favroutes';
    return this.httpClient.get(url, {
      headers:{authorization: this.userservice.token}
    });
  }

}



