import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuardService } from './services/auth-guard.service';

export const AppRoutes: Routes = [
	{
		path: '',
		children: [
			{ path: '', redirectTo: '', pathMatch: 'full' },
			{
				path: 'components',
				loadChildren: () => import('./components/component.module').then(m => m.ComponentsModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: '/components/auth/login'
	}
];