import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: ''};

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.min(3)])
  });

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
              private auth: AuthService,
              private router: Router) {

                
               }

  ngOnInit() {
    
  }

  onLogin() {
    
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log('email', email);
    console.log('password', password);

    // this.auth.loginUser(email, password).then(
    //   () => {
    //     this.loading = false;
    //     this.router.navigate(['/sauces']);
    //   }
    // ).catch(
    //   (error) => {
    //     this.loading = false;
    //     this.errorMsg = error.message;
    //   }
    // );
  }

}