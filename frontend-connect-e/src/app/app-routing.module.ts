import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [

  {
		path: '',
		component: MainComponent,
		children: [
			{ path: '', component: HomeComponent, redirectTo: '', pathMatch: 'full' },
			{
				path: 'auth', loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'auth/login'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
