import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutes } from './component.routing';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from '../app.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuardService } from '../services/auth-guard.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  providers: [
      AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class ComponentsModule {}
