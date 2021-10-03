import { Component, OnInit, ViewChild, ApplicationInitStatus } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
// import { AuthFirebaseService } from '../../../services/auth-firebase.service';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { UserService } from 'src/app/services/user.service';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
    errorMessage: string = '';
  error: { name: string, message: string } = { name: '', message: ''};
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/), Validators.min(3)])
  });
  hide = true;
  get emailInput() { return this.signInForm.get('email'); }
  // console.log
  get passwordInput() { return this.signInForm.get('password'); }  


  // @ViewChild('matInput', { read: true, static: true}) matInput: MatInput;
  
  constructor(private formBuilder: FormBuilder,
              public router: Router
              // private _AuthFireBaseService: AuthFirebaseService,
              // private _UserService: UserService,
              // private AngularFireAuth: AngularFireAuth) 
            ){ }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  getErrorMessage() {
    return this.signInForm.get('Email').value.hasError('required') ? 'Veuillez entrez votre email' :
    this.signInForm.get('Email').value.hasError('email') ? 'L/nemail n/nest pas valide' :
            '';
  }

  onSubmit() {
    
    const email = this.signInForm.get('email').value;    
    const password = this.signInForm.get('password').value;
       
    this.clearErrorMessage();

      if(this.validateForm(email, password)) 
    {
      // this._AuthFireBaseService.loginWithEmail(email, password).then(data=>
      // {
      //   var user = firebase.auth().currentUser;
      //   console.log('currentuser', user);

      //   if(!user.emailVerified) {

      //     //En attente de vérification de l'email. Déconnexion pour ne plus avoir accès au diférent menu.
      //     // this._AuthFireBaseService.signOut().then(() => {
      //       this.router.navigate(['/component/checked_email']);
      //     // })

      //   } else {

      //       console.log('email vérifié');
      //       this._UserService.Authorized(user.uid);
      //       // L'utilisateur a cliqué sur le lien de vérification de l'adresse email
      //       // Redirection vers la page Dashboardsa

      //       this._UserService.authorized.subscribe(auth => {
      //         if(auth) {
      //           console.log('user authorisé');
      //           this.router.navigate(['/dashboard']);
      //         } else {
      //           console.log('user non authorisé');
      //           this._AuthFireBaseService.signOut()
      //           this.errorMessage = 'Vous n\'avez pas les droits pour utiliser cette application. Pour pouvoir utiliser cette application, veuillez contacter un administrateur de la JALP.'
      //         }
      //       });           

      //   };        

      // }).catch(error => {

      //   switch (error.code) {
      //     case 'auth/user-not-found':
      //       this.errorMessage = 'Utilisateur ou mot de pas inconnu';
      //     case 'auth/wrong-password':
      //       this.errorMessage = 'Utilisateur ou mot de pas inconnu';
      //   }
        
      // });
    
    };
    
  }


  clearErrorMessage() 
  {
    this.errorMessage = '';
    this.error = {name: '', message: ''}
  }

  validateForm(email, password) 
      {
        if(email.lenght === 0)
        {
          this.errorMessage = 'Veuillez renseigner un email';
          return false;
        }

        if(password.lenght === 0)
        {
          this.errorMessage = 'Veuillez renseigner un mot de passe';
          return false;
        }

        if(password.lenght < 6)
        {
          this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
          return false;
        }

        this.errorMessage = '';
        return true;
      }
  }


