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
          
          this._authService.isAuth$.subscribe(isauth => {
            if (isauth) {
              console.log('canActivate');
              resolve(true);
            } else {
              resolve(false);
              console.log('can not activate');
              this.router.navigate(['']);
            }
          })
            
    });
  }
}
