import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { UserService } from './users/user-service.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(UserService)
    .isUserAuthenticated$
    .pipe(
      map((isAuthenticated) =>
        isAuthenticated ? true : createUrlTreeFromSnapshot(next, ['/', 'home', 'login'])
      )
    );
};

export const adminGuard = (next: ActivatedRouteSnapshot) => {
  return inject(UserService)
    .isAdmin$
    .pipe(
      map((isAdmin) =>
        isAdmin ? true : createUrlTreeFromSnapshot(next, ['/', 'home'])
      )
    );
}
