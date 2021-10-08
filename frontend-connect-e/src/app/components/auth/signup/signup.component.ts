import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';

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

  email='';
  password='';
  message = '';
  errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: ''};
  // this.validation = new FormControl(false, Validators.requiredTrue);

  // @ViewChild('matInput', { read: true, static: true}) matInput?: MatInput;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
    
   }


  onSignUp() {
    console.log('validation');
  }
  
}
