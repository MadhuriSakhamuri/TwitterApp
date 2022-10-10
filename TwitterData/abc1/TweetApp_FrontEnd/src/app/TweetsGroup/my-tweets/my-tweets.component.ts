import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditTweetPopupComponent } from '../edit-tweet-popup/edit-tweet-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.css']
})

export class MyTweetsComponent implements OnInit {

  userName: any;
  myTweets:any;
  replyData:any;
  replyTweetData:any=[];

  constructor(private dialog: MatDialog, private http:HttpClient, private router: Router, private toastr:ToastrService) { }
 
  ngOnInit(): void {
    this.userName = localStorage.getItem('token');
    console.log(this.userName);
    this.getMyTweets();
  }

  getMyTweets(){
    let getTweetUrl='http://localhost:5000/api/v1.0/TweetApp/' + 'tweets/' + this.userName; 
    this.http.get(getTweetUrl).subscribe(result=>{
      this.myTweets=result;
      console.log("MyTweets::",this.myTweets);
    })
  }

  replyTweet(replyId, replyData) {
    let dateTime = new Date().getTime();
    let dateFormat = formatDate(dateTime, 'yyyy-MM-dd HH:mm:ss', 'en').toString();
    console.log("reply-data", replyData)
    this.replyTweetData =
    {
      "replyBody": replyData,
      "replyTimestamp": dateFormat,
      "repliedBy": '',
      'replyLoginId': this.userName,
      "tweetId": replyId
    }
    let replyUrl = 'http://localhost:5000/api/v1.0/TweetApp/' + 'postReply/reply'
    this.http.post(replyUrl, this.replyTweetData).subscribe(result => {
      this.toastr.success('You replied to the tweet')
      this.getMyTweets()
    })
    this.replyData = ''
    console.log("replied::", this.replyTweetData)
  }

  openEditTweetModal(tweet: any){
    const dialogRef = this.dialog.open(EditTweetPopupComponent, {
      width: '700px',
      minHeight: 'calc(45vh - 60px)',
      height: 'auto',
      data: {
        modalData: tweet
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true'){
        this.getMyTweets();
      }
    })
  }

  deleteTweet(tweet: any){
    if(confirm('Do you want to delete the tweet "'+tweet.body+'" ?') == true){
      this.http.post('http://localhost:5000/api/v1.0/TweetApp/' + 'tweets/deleteTweet', tweet).subscribe(result=>{
        this.toastr.error('Tweet deleted successfully');
        this.getMyTweets();
      },
      error => {
        this.toastr.error(error.error.text);
      });
    }
    else{
      return;
    }
  }
}
