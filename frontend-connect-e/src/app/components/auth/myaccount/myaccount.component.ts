import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  MyAccountForm = this.formBuilder.group({
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  });
 
  constructor(private _authService: AuthService,
              private _userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this._userService.getUser(this._authService.userId).then((user) => {
      this.MyAccountForm.setValue({
        lastname: user.lastname,
        fisrtname: user.firstname,
        email: user.email 
      })
    })
  }

  onUpdate() {
    
  }

}
