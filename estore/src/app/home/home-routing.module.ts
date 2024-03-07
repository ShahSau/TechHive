import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductsGalleryComponent } from './components/products-gallery/products-gallery.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { UserSignupComponent } from './components/users/user-signup/user-signup.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { PastordersComponent } from './components/pastorders/pastorders.component';
import { FavouritiesComponent } from './favourities/favourities.component';
import { authGuard } from './services/authguard';
import {MeComponent} from './components/users/me/me.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product/:id',
        component: ProductdetailsComponent,
        canActivate:[authGuard]
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate:[authGuard]
      },
      {
        path: 'signup',
        component: UserSignupComponent,
      },
      {
        path: 'me',
        component: MeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'login',
        component: UserLoginComponent
      },
      {
        path: 'pastorders',
        component: PastordersComponent,
        canActivate:[authGuard]
      },
      {
        path: 'favourites',
        component: FavouritiesComponent,
        canActivate:[authGuard]
      }
      // {
      //   path: '',
      //   redirectTo: 'products',
      //   pathMatch: 'full',
      // },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}