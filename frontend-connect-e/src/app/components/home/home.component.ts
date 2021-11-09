import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "Groupomania";
  constructor(private _tokenStorageService: TokenStorageService,
              private _authService: AuthService,
              private _userService: UserService,
              private router: Router) { }

  ngOnInit(): void {

    if (this._tokenStorageService.getToken()) {
      this._authService.isAuth$.next(true);
      this._userService.getUser(this._tokenStorageService.getUserId()).subscribe(user => {
        this._userService.connectedUser$.next(user);
        this.router.navigate(['/news-feed']);
      })      
    } else {
      this._authService.isAuth$.next(false);
    }

  }

}
