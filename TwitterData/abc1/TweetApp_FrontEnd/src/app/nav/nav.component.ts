import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPassPopupComponent } from '../login/forget-pass-popup/forget-pass-popup.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userName:any;
  constructor(public authService: AuthService,private toastr:ToastrService,private route:Router,private dialog:MatDialog) { }

  ngOnInit(): void { }

  loggedIn(){
    this.userName=localStorage.getItem('token');
    return this.authService.loggedIn();
  }

  logout(){
    const token = localStorage.removeItem('token');
    this.userName='';
    this.toastr.success('Logged Out!');
    this.route.navigate(['/login']);
  }

  resetPassword(){
    const dialogRef = this.dialog.open(ForgetPassPopupComponent,{
      width: '700px',
      minHeight: 'calc(45vh - 60px)',
      height:'auto'
    });
  }
}
