import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
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

  @ViewChild('imageInput')
  imageInput: ElementRef | any;
  
  constructor(private _authService: AuthService,
              private _userService: UserService,
              private formBuilder: FormBuilder,
              private _tokenStorageService: TokenStorageService,
              private router: Router,
              private _handler: HandlerErrorService) {

                this.MyAccountForm = this.formBuilder.group({
                  lastname: [{value: '', disabled: true }, Validators.required],
                  firstname: [{value: '', disabled: true }, Validators.required],
                  email: [{value: '', disabled: true }, [Validators.required, Validators.email]],
                  password: [{value: '', disabled: true }]
                });
               }

  ngOnInit(): void {

    if (this._tokenStorageService.getToken()) {
      this._authService.isAuth$.next(true);
      this._userService.getUser(this._tokenStorageService.getUserId()).subscribe(user => {
        this.currentUser = this._userService.transformUser(user);

        this.MyAccountForm.setValue({
          lastname: this.currentUser.lastname,
          firstname: this.currentUser.firstname,
          email: this.currentUser.email,
          password: '*******'
        });

        this.imagePreview = this.currentUser.imageURL;
      });
    }     
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

    
    this._userService.updateDataUser({id, name, value})
        .then((res) => {
          console.log(res)
        })
        .catch(error => {this._handler.handleError(error); })
 
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

    this._userService.updateImageUser(this._tokenStorageService.getUserId(), file)
    .subscribe(user => {
      this.currentUser.imageURL = user.imageURL;
      this.imagePreview = user.imageURL;
    });
  
  }

  selectFile(): void {
    this.imageInput.nativeElement.click();
  }

  onDelete() {

    this._tokenStorageService.signOut();
    this._userService.deleteUser(this.currentUser.id).subscribe(response => {
      if(response) {
        this._authService.isAuth$.next(false);
      }
      
      console.log(response);
    })

  }

  onBack() {
    this._userService.connectedUser$.next(this.currentUser);
    this.router.navigate(['/news-feed']);
    
  }
}
