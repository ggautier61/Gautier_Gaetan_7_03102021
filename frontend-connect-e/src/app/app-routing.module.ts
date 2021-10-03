import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [];


export const Approutes: Routes = [
	{
		path: '',
		component: AppComponent,
		children: [
			{ path: '', redirectTo: '', pathMatch: 'full' },
			{
				path: 'home',
				canActivate: [AuthGuardService],
				loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
			},
			{
				path: 'component',
				loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: '/component/auth/login'
	}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
