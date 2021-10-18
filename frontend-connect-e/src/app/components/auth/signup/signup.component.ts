import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  SignUpForm = this.formBuilder.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  });

  message= '';

  public errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: ''};
  // this.validation = new FormControl(false, Validators.requiredTrue);

  // @ViewChild('matInput', { read: true, static: true}) matInput?: MatInput;
  
  constructor(private formBuilder: FormBuilder,
              private _authService: AuthService,
              private router: Router) { }

  ngOnInit(): void { 
    
   }


  onSignUp(): void {

    const data = {
      lastname: this.SignUpForm.get('lastname')?.value,
      firstname: this.SignUpForm.get('firstname')?.value,
      email: this.SignUpForm.get('email')?.value,
      password: this.SignUpForm.get('password')?.value,
    }

    //TODO : a voir pour modification
    // const { username, email, password } = this.SignUpForm;

    // this.authService.register(username, email, password).subscribe(
    //   data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // );

    //TODO : End


    
    this._authService.createUser(data).then(userId => {
      console.log('Création réussie. L\'Id User est '+ userId);
      // this.userService.getUser()
      this.router.navigate(['/news-feed']);
    })
    .catch(error => {
      console.log(error);
      this._authService.handleError(error);
      this.errorMessage = error.error.message;
    });
  }
}
