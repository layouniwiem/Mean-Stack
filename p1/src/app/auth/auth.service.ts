import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject <boolean>();
  constructor(private http: HttpClient, private router: Router) {}
getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/users/register', authData)
      .subscribe(response => {
        console.log(response);
       this.router.navigate(['/']);

      });


  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/users/login', authData)
      .subscribe(response => {
        console.log('u are connected');
        const token = response.token;
        this.token = token;
        console.log(token);
        if (token) {
          const expiresInDuration = response.expiresIn;
          console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
       //
          const now = new Date();
          const expirationDate = new Date ( now.getTime()+ expiresInDuration * 1000)
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      });

  }
  autoAuthuser() {
  const authInformatin = this.getAuthData();
  if(!authInformatin){
    return;
  }
  const now = new Date();
  const expiresIn = authInformatin.exporationDate.getTime() - now.getTime() ;
  console.log(authInformatin, expiresIn)
  if ( expiresIn > 0) {
    this.token = authInformatin.token;
    this.isAuthenticated = true;
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }

  }
  private setAuthTimer(duration:number) {
    console.log('setting timer' + duration);
    this.tokenTimer =  setTimeout( () => {
      this.logout();
    }, duration * 1000);


  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/acc']);


  }
  private saveAuthData(token: string , expirationData: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationData.toISOString());

  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

  }
  private getAuthData( ) {
    const token = localStorage.getItem('token');
    const exporationDate = localStorage.getItem('expiration');
    if( !token || !exporationDate ) {
      return;
    }
    return {
      token: token,
      exporationDate: new Date(exporationDate)
    }
  }
}
