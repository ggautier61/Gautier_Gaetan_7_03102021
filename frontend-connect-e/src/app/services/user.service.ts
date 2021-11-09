import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUser: User = new User();
  connectedUser$ = new BehaviorSubject<User>(this.connectedUser);
  isAdmin$ = new BehaviorSubject<boolean>(false);
  
  //Define API
  apiURL = "http://localhost:3000/api/";
  
  constructor(private http: HttpClient,
              private _tokenStorageService: TokenStorageService,
              private _authService: AuthService) { }

  getUserConnected() {
    // this.isAdmin$.next(false);
    this.http.get(this.apiURL + 'user/' + this._tokenStorageService.getUserId()).subscribe((user) => {
      console.log('user connected', user);
      this.connectedUser$.next(this.transformUser(user));

      this.connectedUser$.subscribe(user => {
        user.roles.forEach(role => {
          if(role.name == 'admin') {
            this.isAdmin$.next(true);
          }
        });
      })
     
      
      
    });
  }

  transformUser(data: any): User {
    const user: User = {
      id: data.id,
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      password: '',
      imageURL: data.imageURL,
      roles: data.roles
    };
    return user;
  }

  getUser(id: string): Observable<any> {
    
    return this.http.get(this.apiURL + 'user/' + id);
   
  }

  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  modifyDataUser(user: {id: string, name: string, value: string}): Promise<any> {

    return new Promise<any>((resolve, reject) => {

     
      // this.http.post('http://localhost:3000/api/sauces', formData).subscribe(
      this.http.put(this.apiURL + 'user', user)
              .subscribe((res: any) => {
                console.log(res);
                resolve(true);
              },
              (error) => { this._authService.handleError(error);});
            })
    
  }

  modifyImageUser(id: string, file: File): Observable<User> {

    const formData = new FormData();
    formData.append('id', id);
    (file) &&  formData.append('file', file, file.name);

    // const option = { headers: new HttpHeaders({
    //   'Content-Type': 'multipart/form-data',
    //   'boundary': '{}',
    //   'enctype': 'multipart/form-data'
    // })}

    // const option = {headers: new HttpHeaders({
    //   'Content-Type': 'multipart/form-data'
    // })}; 

    return (this.http.post(this.apiURL + 'image', formData) as Observable<User>);
      // .subscribe(res => {
      //   console.log(res);
      // })
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL + 'users');
  }

  deleteUser(id:string) {
    return this.http.delete(this.apiURL + 'user/' + id);
  }

  getImageUserConnected(): string | any{

    this.getUser(this._tokenStorageService.getUserId()).subscribe(user => {
      return user.imageURL;
    });

  }
}

