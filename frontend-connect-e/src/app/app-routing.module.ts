import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  {
		path: '',
		component: MainComponent,
		children: [
			{ path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full' },
			{
				path: '', 
				canActivate: [AuthGuardService],
				loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
			},
			{ path: 'signup', component: SignupComponent },
			{ path: 'login', component: LoginComponent, pathMatch: 'full'	},
			
		]
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
