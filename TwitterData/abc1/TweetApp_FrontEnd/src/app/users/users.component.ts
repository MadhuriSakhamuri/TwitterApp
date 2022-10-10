import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndividualTweetsPopupComponent } from '../TweetsGroup/individual-tweets-popup/individual-tweets-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userName: any;
  allUsers: any;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userName=localStorage.getItem('token');
    console.log(this.userName);
    let getAllUsersUrl='http://localhost:5000/api/v1.0/TweetApp/' + 'tweets/getAllUsers'
    this.http.get(getAllUsersUrl).subscribe(result=>{
      this.allUsers=result;
      console.log("AllUsers::",this.allUsers);
    })
  }

  openIndividualTweetsModal(loginId: any) {
    const dialogRef = this.dialog.open(IndividualTweetsPopupComponent, {
      width: '100%',
      minHeight: 'calc(25vh - 30px)',
      height: '450px',
      data: {
        LoginId: loginId
      }
    })
  }
}
