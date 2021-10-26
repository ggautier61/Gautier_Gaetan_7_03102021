import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isAuth: boolean = false
  constructor(private _tokenStorageService: TokenStorageService,
              private _authService: AuthService) { 

    this._authService.isAuth$.subscribe((res) => {
      this.isAuth = res;
    })

              }

  ngOnInit() {
  }

  onSignOut() {
    //Effacement des données stockées de la session
    this._tokenStorageService.signOut();
    this._authService.logOut();
  }

}
