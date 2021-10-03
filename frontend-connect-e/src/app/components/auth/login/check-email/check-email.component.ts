import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import * as firebase from 'firebase';
// import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent implements OnInit {

  constructor(private _matSnackBar: MatSnackBar,
              // public _AuthFirebaseService: AuthFirebaseService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSendAgain() {
    // Envoi email de bienvenue
    // firebase.auth().languageCode = 'fr';
    // var user = firebase.auth().currentUser;
    // user.sendEmailVerification().then( function() {
    //   console.log('Email envoyé avec succés !!!');      
    // }).catch(function(error) {});

    // this._matSnackBar.open(`un email vient de vous être envoyé`, 'Fermer', { duration: 2000 });
    // this._AuthFirebaseService.signOut();
    // this.router.navigate(['/component/auth/login']);
   
  }

}
