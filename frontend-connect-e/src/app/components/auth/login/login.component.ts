import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: ''};

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  
  

  // signInForm: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', Validators.required)
  // });

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

  onSubmit() {
    
    if(this.signInForm.valid) {

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

      this.auth.loginUser(email, password).then(res => {
        console.log(res);
        this.router.navigate(['/news-feed']);
      })
      .catch((error) => console.log(error))
      
    } else {
      console.log('invalid');
    }
  }

  // onSubmit(signInForm: NgForm) {
  //   console.log(signInForm.value);
  //   console.log(signInForm.valid);
  // }

  onLogin() {
    
    
    // const email = this.signInForm.get('email')?.value;
    // const password = this.signInForm.get('password')?.value;

    // console.log('email', email);
    // console.log('password', password);

    // this.auth.loginUser(email, password)
    // .then(() => {
    //   console.log('connexion ok');
    // })
    // .catch((error) => { 

    // })

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