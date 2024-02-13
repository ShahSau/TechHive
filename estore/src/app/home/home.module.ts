import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { CartComponent } from './components/cart/cart.component';
import { UserSignupComponent } from './components/users/user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { UserService } from './services/users/user-service.service';
import { OrderService } from './services/order/order.service';

@NgModule({
  declarations: [
    HomeComponent,
    CatnavigationComponent,
    HeaderComponent,
    SidenavigationComponent,
    ProductsComponent,
    ProductsGalleryComponent,
    ProductdetailsComponent,
    CartComponent,
    UserSignupComponent,
    UserLoginComponent,
  ],
  //Imports are used to make other modules available to this module
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  //Providers are used to make services available to the module
  providers: [
    CategoryService,
    CategoriesStoreItem,
    ProductsService,
    ProductsStoreItem,
    CartStoreItem,
    UserService,
    OrderService
  ],
})
export class HomeModule { }
