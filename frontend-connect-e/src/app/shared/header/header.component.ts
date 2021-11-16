import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuth: boolean = false;
  imageProfile: string = '';

  constructor(private _tokenStorageService: TokenStorageService,
              private _authService: AuthService,
              private _userService: UserService,
              private _handler: HandlerErrorService) { 

    this._authService.isAuth$.subscribe((res) => {
      this.isAuth = res;
    });

    this._userService.connectedUser$.subscribe(user => {
      this.imageProfile = user.imageURL;
    },    
    error => { 
      this._handler.handleError(error);
    });

  }

  ngOnInit() {
  }

  onSignOut() {
    //Effacement des données stockées de la session
    this._tokenStorageService.signOut();
    this._authService.logOut();
  }

}
