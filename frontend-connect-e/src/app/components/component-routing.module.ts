import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyaccountComponent } from './auth/myaccount/myaccount.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
		children: [
      { path: 'news-feed', component: NewsFeedComponent	},
      { path: 'profile', component: MyaccountComponent	},
      { path: 'users', component: UsersComponent},
      { path: 'notifications', component: NotificationsComponent }
		]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
