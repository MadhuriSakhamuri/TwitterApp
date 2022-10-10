import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { ForgetPassPopupComponent } from './forget-pass-popup/forget-pass-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private dialog: MatDialog, private authService: AuthService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
  }
  openModal() {
    const dialogRef = this.dialog.open(ForgetPassPopupComponent, {
      width: '700px',
      minHeight: 'calc(45vh - 60px)',
      height: 'auto'
    });
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastr.success('Logged In successfully!');
    }, error => {
      console.log(error);
      this.toastr.error(error.error.text);
    }, () => {
      this.route.navigate(['/post-tweet']);
    }
    );
  }


}
