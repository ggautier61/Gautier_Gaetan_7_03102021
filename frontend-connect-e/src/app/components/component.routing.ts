import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'auth/login',
				component: LoginComponent,
				data: {
					title: 'Connexion'
				}
			},
			{
				path: 'auth/logout',
				component: LogoutComponent,
				data: {
					title: 'LogOut'
				}
			}
			
		]
	}
];
