import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "Groupomania";
  constructor(private _tokenStorageService: TokenStorageService,
              private _authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    if (this._tokenStorageService.getToken()) {
      console.log('token dans storage');
      this._authService.isAuth$.next(true);
      this.router.navigate(['/news-feed']);
    } else {
      this._authService.isAuth$.next(false);
    }

  }

}
