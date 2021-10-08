import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      
    return new Promise (
        (resolve, reject) => {  
          
            if(this._authService.isAuth$) {
              console.log(this._authService.isAuth$);
              resolve(true);
            } else {
              console.log(this._authService.isAuth$);
              resolve(false);
              this.router.navigate(['']);
            }   
    });
  }
}
