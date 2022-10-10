import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllTweetsComponent } from './TweetsGroup/all-tweets/all-tweets.component';
import { MyTweetsComponent } from './TweetsGroup/my-tweets/my-tweets.component';
import { PostTweetComponent } from './TweetsGroup/post-tweet/post-tweet.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'post-tweet',component:PostTweetComponent},
  {path:'all-tweets',component:AllTweetsComponent},
  {path:'my-tweets',component:MyTweetsComponent},
  {path:'users',component:UsersComponent},
  {path:'**', component:HomeComponent, pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
