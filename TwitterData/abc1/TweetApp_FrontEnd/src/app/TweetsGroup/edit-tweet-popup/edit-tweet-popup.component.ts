import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-tweet-popup',
  templateUrl: './edit-tweet-popup.component.html',
  styleUrls: ['./edit-tweet-popup.component.css']
})
export class EditTweetPopupComponent implements OnInit {

  mockTweet:any;
  tweetData='';
  oldTweetData: any;
  userName:any;
  updatedTweet:any;

  constructor(private http:HttpClient, private toastr:ToastrService, private router: Router, @Inject(MAT_DIALOG_DATA) public data) { 
    this.mockTweet=data.modalData;
  }

  ngOnInit(): void {
    this.userName=localStorage.getItem('token');
    console.log(this.mockTweet);
    this.tweetData=this.mockTweet.body;
    console.log(this.tweetData);
  }

  editTweet(){
    this.updatedTweet=
      {
        "id": this.mockTweet.id,
        "body": this.tweetData,
        "loginId":this.userName,   
      }

    this.http.put('http://localhost:5000/api/v1.0/TweetApp/' + 'tweets/editTweet', this.updatedTweet).subscribe(result=>{
        this.toastr.warning('Tweet updated successfully');
      },
      error => {
        this.toastr.error(error.error.text);
      });
  }

}
