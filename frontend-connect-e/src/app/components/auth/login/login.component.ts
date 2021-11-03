import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: ''};

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  

  hide = true;
  get emailInput() { 
    if(this.signInForm.get('email')) { 
      return this.signInForm.get('email');
    } else {
      return;
    }
  }
  get passwordInput() { return this.signInForm.get('password'); } 

  errorMsg!: string;

  constructor(private formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router,
              private _tokenStorageService: TokenStorageService) {
               }

  ngOnInit() {

    if (this._tokenStorageService.getToken()) {
      this._authService.isAuth$.next(true);
      this.router.navigate(['/news-feed']);
    } 
    // else {
    //   this._authService.isAuth$.next(false);
    // }
    
  }

  onSubmit(): void {
    
    if(this.signInForm.valid) {

      const email = this.signInForm.get('email')?.value;
      const password = this.signInForm.get('password')?.value;

      this._authService.loginUser(email, password)
      .subscribe(
        res => {
          this._tokenStorageService.saveToken(res.accessToken);
          this._tokenStorageService.saveUser(res);
          this._authService.isAuth$.next(true);
          this.router.navigate(['/news-feed']);
        },
        error => { 
          this._authService.handleError(error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

}