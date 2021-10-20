import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _tokenStorageService: TokenStorageService,
              private _authService: AuthService) { }

  ngOnInit() {
  }

  onSignOut() {
    this._tokenStorageService.signOut();
    this._authService.logOut();
  }

}
