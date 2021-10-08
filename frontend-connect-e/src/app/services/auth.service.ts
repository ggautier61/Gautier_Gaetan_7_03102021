import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuth$ = true;
  // isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string = '';
  userId: string = '';

  constructor(private http: HttpClient,
              private router: Router) {}

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signup', {email: email, password: password})
      .subscribe(
        {
          next(message) { resolve(message); },
          error(err) { reject(err); }
        })
    });
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve(false);
    })
    // return new Promise((resolve, reject) => {
    //   this.http.get('http://localhost:3000/api/auth/login', {email: email, password: password})
    //   .subscribe(
    //     {
    //       (next: {userId: string, token: string }) {
    //         this.userId = user.userId;
    //         // this.authToken = token;
    //         // this.isAuth$.next(true);
    //         resolve(true);
    //       },
    //       error(err) { reject(err); }
          
    //     });
    // });
  }

  logout() {
    this.authToken = '';
    this.userId = '';
    // this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}
