import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuardService implements CanActivate{
      
    constructor(private router: Router) {

    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      
        return new Promise (
            (resolve, reject) => {
             
                  resolve(false);
      
                  this.router.navigate(['/components/auth/login']);
                
              });
              
            }
        
       
  }