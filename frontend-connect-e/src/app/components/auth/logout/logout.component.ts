import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
// import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    // private _AuthFireBaseService: AuthFirebaseService,
              private router: Router)
  { 
      // this._AuthFireBaseService.signOut();
  }

  ngOnInit(): void {
    this.router.navigate(['/component/auth/login'])
  }

  onConnect(){
    
  }

}
