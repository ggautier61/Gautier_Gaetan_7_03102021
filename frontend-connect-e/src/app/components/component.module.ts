import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { ComponentRoutingModule } from './component-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { SignupComponent } from './auth/signup/signup.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { MyaccountComponent } from './auth/myaccount/myaccount.component';
import { UsersComponent } from './users/users.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SnackConfirmComponent } from '../shared/snack-confirm/snack-confirm.component';

@NgModule({
  declarations: [
    MainComponent,
    NewsFeedComponent,
    MyaccountComponent,
    UsersComponent,
    NotificationsComponent,
    SnackConfirmComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [

  ]
})
export class ComponentModule { }
