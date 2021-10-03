import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {useHash: true}),
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
