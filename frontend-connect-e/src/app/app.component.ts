import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  authStatus: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit() {
    // this.authStatus = this._authService.isAuth;
  }
  
}
