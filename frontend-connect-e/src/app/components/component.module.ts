import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { ComponentRoutingModule } from './component-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './auth/signup/signup.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { MyaccountComponent } from './auth/myaccount/myaccount.component';


@NgModule({
  declarations: [
    MainComponent,
    NewsFeedComponent,
    MyaccountComponent,
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class ComponentModule { }
