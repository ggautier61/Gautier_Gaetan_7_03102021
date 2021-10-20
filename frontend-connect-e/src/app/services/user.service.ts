import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

const apiURL = "http://localhost:3000/api/test/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUser: User = new User();
  
  constructor(private http: HttpClient) { }

  getUser(id: any) {
    
    console.log(id);
    return new Promise<User>((resolve,reject) => {
      this.http.get(apiURL + 'user?id=' + id)
      .subscribe(


        // (user: User) => {
        //   console.log(user);
        // }
      )
    })
  }
}

