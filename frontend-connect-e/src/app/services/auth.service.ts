import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // isAuth$ = false;
  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string = '';
  userId: Number = 0;

  // Define API
  apiURL = 'http://localhost:3000/api/auth/';

  constructor(private http: HttpClient,
              private router: Router) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  




  createUser(data: {lastname: string, firstname: string, email: string, password: string}): Promise<any> {

    // const apiURL = 'http://localhost:3000/api'
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiURL + 'signup', data)
      .subscribe(
        (user: any) => {
          console.log(user);
          // console.log(JSON.parse(user));
          this.isAuth$.next(true);
          this.userId = user.userId;
          // console.log(user.token);
          return resolve(JSON.parse(user));},
        (error) => { this.handleError; reject(error);}
      );
    });

  }  
  


  getToken(): string {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string): Observable<any> {
   
      return this.http.post(this.apiURL + 'login', {email: email, password: password});
  
  }


  logout() {
    this.authToken = '';
    this.userId = 0;
    // this.isAuth$.next(false);
    this.router.navigate(['login']);
  }



  // Error handling 
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
