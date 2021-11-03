import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUser: User = new User();

  //Define API
  apiURL = "http://localhost:3000/api/";
  
  constructor(private http: HttpClient,
              private _tokenStorageService: TokenStorageService,
              private _authService: AuthService) { }

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

  getUsers() {
    return this.http.get(this.apiURL + 'users');
  }
}

