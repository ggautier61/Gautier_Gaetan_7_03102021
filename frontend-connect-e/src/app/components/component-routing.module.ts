import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyaccountComponent } from './auth/myaccount/myaccount.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';


const routes: Routes = [
  {
    path: '',
		children: [
      { path: 'news-feed', component: NewsFeedComponent	},
      { path: 'myaccount', component: MyaccountComponent	}
		]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
