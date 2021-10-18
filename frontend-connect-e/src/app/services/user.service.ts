import { Injectable } from '@angular/core';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = "http://localhost:3000/api/"
  connectedUser: User = new User();
  http: any;
  constructor(private _authService: AuthService) { }

  getUser(id: any) {
    
    console.log(id);
    return new Promise<User>((resolve,reject) => {
      this.http.get(this.apiURL + 'user?id=' + id)
      .subscribe(


        (user: User) => {
          console.log(user);
        }
      )
    })
  }
}

