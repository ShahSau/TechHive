import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user, loginToken, loggedInUser  } from 'src/app/home/types/user.type';

@Injectable()
export class UserService {
  private autoLogoutTimer: any;
  private authToken:string;
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(
    <loggedInUser>{}
  );
  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  get loggedInUser(): loggedInUser {
    return this.loggedInUserInfo.value;
  }

  get token(): string {
    return this.authToken;
  }


  createUser(user: user): Observable<any> {
    const url: string = 'https://estore-backend-9kay.onrender.com/api/auth/signup';
    return this.httpClient.post(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'https://estore-backend-9kay.onrender.com/api/auth/signin';
    return this.httpClient.post(url, { email: email, password: password });
  }

  activateToken(token: loginToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'expiry',
      new Date(Date.now() + token.expiresInSeconds * 1000).toISOString()
    );
    localStorage.setItem('user', JSON.stringify(token.user));
    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(token.user);
    this.setAutoLogoutTimer(token.expiresInSeconds * 1000);
    this.authToken = token.token;
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next(<loggedInUser>{});
    clearTimeout(this.autoLogoutTimer);
  }

  private setAutoLogoutTimer(duration: number): void {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  loadToken(): void {
    const token: string | null = localStorage.getItem('token');
    const expiry: string | null = localStorage.getItem('expiry');
    if (!token || !expiry) {
      return;
    } else {
      const expiresIn: number =
        new Date(expiry).getTime() - new Date().getTime();
      if (expiresIn > 0) {
        const userStorage: string | null = localStorage.getItem('user');

        const user: loggedInUser = {
          username: userStorage ? JSON.parse(userStorage).username : '',
          email: userStorage ? JSON.parse(userStorage).email : '',
          firstName: userStorage ? JSON.parse(userStorage).firstName : '',
          lastName: userStorage ? JSON.parse(userStorage).lastName : '',
          address: userStorage ? JSON.parse(userStorage).address : '',
        };

        this.isAuthenticated.next(true);
        this.loggedInUserInfo.next(user);
        this.setAutoLogoutTimer(expiresIn);
        this.authToken = token;
      } else {
        this.logout();
      }
    }
  }

}


