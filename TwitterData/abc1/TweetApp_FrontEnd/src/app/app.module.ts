import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { ForgetPassPopupComponent } from './login/forget-pass-popup/forget-pass-popup.component';
import { MatDialogModule} from '@angular/material/dialog'
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashtagMentionColLibModule } from 'hashtag-mention-colorizer';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimeagoModule } from 'ngx-timeago';
import { PostTweetComponent } from './TweetsGroup/post-tweet/post-tweet.component';
import { AllTweetsComponent } from './TweetsGroup/all-tweets/all-tweets.component';
import { MyTweetsComponent } from './TweetsGroup/my-tweets/my-tweets.component';
import { EditTweetPopupComponent } from './TweetsGroup/edit-tweet-popup/edit-tweet-popup.component';
import { IndividualTweetsPopupComponent } from './TweetsGroup/individual-tweets-popup/individual-tweets-popup.component';

import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
   NavComponent, HomeComponent, LoginComponent, RegisterComponent, UsersComponent,
   ForgetPassPopupComponent,
   PostTweetComponent,
   AllTweetsComponent,
   MyTweetsComponent,
   EditTweetPopupComponent,
   IndividualTweetsPopupComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    HashtagMentionColLibModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-center',
      timeOut:1000
    }),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    TimeagoModule.forRoot(),
    HashtagMentionColLibModule

  ],
  exports: [
    HashtagMentionColLibModule,
    TimeagoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
