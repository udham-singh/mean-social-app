import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = `${environment.apiUrl}/user/`;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated: boolean;
    private token: string;
    private loggedUser: AuthData;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer: any;

    constructor(private http: HttpClient, private router: Router) {
      this.getAuthData();
    }

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUser() {
        return this.loggedUser;
    }

    createUser(reqData: AuthData) {
        return this.http.post(`${BACKEND_URL}signup`, reqData)
                        .subscribe(() => {
                          this.router.navigate(['/auth/login']);
                          this.authStatusListener.next(true);
                        }, error => {
                          this.authStatusListener.next(false);
                        });
    }

    login(reqData: {email: string, password: string}) {
        this.http.post<{token: string, expiresIn: number, user: AuthData}>(
          `${BACKEND_URL}login`,
          reqData
          ).subscribe(res => {
                this.token = res.token;
                if (this.token) {
                    this.loggedUser = res.user;
                    const expiresInDuration = res.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(this.token, res.user, expirationDate);
                    this.router.navigate(['/']);
                }
            }, error => {
              this.authStatusListener.next(false);
            });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          this.token = authInformation.token;
          this.loggedUser = authInformation.user;
          this.isAuthenticated = true;
          this.setAuthTimer(expiresIn / 1000);
          this.authStatusListener.next(true);
        }
      }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
        console.log('Setting timer: ' + duration);
        this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      }

    private saveAuthData(token: string, user: AuthData, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const expirationDate = localStorage.getItem('expiration');
        if (!token || !expirationDate) {
          return;
        }
        return {
          token: token,
          user: user,
          expirationDate: new Date(expirationDate)
        };
      }
}
