import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  MyAccountForm: FormGroup | any;

  currentUser: User | any;

  lastnameIsDisabled: boolean = true;
  firstnameIsDisabled: boolean = true;
  emailIsDisabled: boolean = true;
  passwordIsDisabled: boolean = true;
  imagePreview: string = '';
  imageFile: File | undefined | null;

  errorMessage: string = '';
  
  constructor(private _authService: AuthService,
              private _userService: UserService,
              private formBuilder: FormBuilder,
              private _tokenStorageService: TokenStorageService) {
                this.MyAccountForm = this.formBuilder.group({
                  lastname: [{value: '', disabled: true }, Validators.required],
                  firstname: [{value: '', disabled: true }, Validators.required],
                  email: [{value: '', disabled: true }, [Validators.required, Validators.email]],
                  password: [{value: '', disabled: true }],
                  image: [''] 
                });
               }

  ngOnInit(): void {

    if (this._tokenStorageService.getToken()) {
      this._authService.isAuth$.next(true);
      this._userService.getUser(this._tokenStorageService.getUserId()).subscribe(user => {
        console.log('user', user);
        this.currentUser = this.getUserReturned(user);

        console.log('currentUser', this.currentUser);

        this.MyAccountForm.setValue({
          lastname: this.currentUser.lastname,
          firstname: this.currentUser.firstname,
          email: this.currentUser.email,
          password: '*******',
          image: ''
        })


      });
    }     
  }

  getUserReturned(data: any): User {
    console.log('data', data);
    const user: User = {
      id: data.id,
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      password: ''
    };
    return user;
  }

  onEdit(name: string) {

    this.MyAccountForm.get(name)?.enable();

    switch(name) {
      case 'lastname': {
        this.lastnameIsDisabled = false;
        break;
      }
      case 'firstname': {
        this.firstnameIsDisabled = false;
        break;
      }
      case 'email': {
        this.emailIsDisabled = false;
        break;
      }
      case 'password': {
        this.passwordIsDisabled = false;
        break;
      }
      default: {
        break;
      }

    }
    
  }

  onSave(name: string) {
    
    const inputName = name;
    const value = this.MyAccountForm.get(name)?.value;

    const id: string = this._tokenStorageService.getUserId();

    
    // this._userService.modifyDataUser({id, name, value}, this.imagePreview)
    //     .then((res) => {
    //       console.log(res)
    //     })
    //     .catch(error => {this._authService.handleError(error); })
 
    this.MyAccountForm.get(inputName)?.disable();

    switch(name) {
      case 'lastname': {
        this.lastnameIsDisabled = true;
        break;
      }
      case 'firstname': {
        this.firstnameIsDisabled = true;
        break;
      }
      case 'email': {
        this.emailIsDisabled = true;
        break;
      }
      case 'password': {
        this.passwordIsDisabled = true;
        break;
      }
      default: {
        break;
      }

    }
  }

 

  onFileAdded(event: Event) {

    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this._userService.modifyImageUser(file);

    // if(this.imageFile) {
    //   this.MyAccountForm.get('image').setValue(file);
    //   this.MyAccountForm.updateValueAndValidity();
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imagePreview = reader.result as string;
    //     console.log(this.imagePreview);
    //   };
    //   reader.readAsDataURL(this.imageFile);
    // }    
  }
}
