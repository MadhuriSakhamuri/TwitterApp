import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forget-pass-popup',
  templateUrl: './forget-pass-popup.component.html',
  styleUrls: ['./forget-pass-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ForgetPassPopupComponent implements OnInit {
  otpSent: Boolean = false
  otpValue: any;
  otp: any;
  loginId: any
  validityFlag: Boolean = false
  showOtherModal: Boolean = true
  changePasswordForm: FormGroup;
  baseUrl: 'http://localhost:5000/api/v1.0/TweetApp/';
  constructor(private dialog: MatDialog, private http: HttpClient, private toastr: ToastrService, private route: Router) { }
  
  ngOnInit(): void {
    this.initializeForm();
  }

  sendOtp() {
    let jsonPayLoad = {
      "loginId": this.loginId
    }

    let sendOtpUrl = 'http://localhost:5000/api/v1.0/TweetApp/' + 'requestOTP'
    this.http.post("http://localhost:5000/api/v1.0/TweetApp/requestOTP", jsonPayLoad).subscribe(result => {
      this.otp = result;
      console.log('OTP::', this.otp);
      this.toastr.success('Otp sent successfully')
      this.otpSent = true;
      this.validityFlag = false;
      this.showOtherModal = true
      console.log(this.otp);
    }, error => {
      this.toastr.error(error.error);
    })

  }

  validateOtp() {
    if(this.otpValue == this.otp) {
     
      this.toastr.success('OTP validated Successfully!!')
      this.validityFlag = true;
      this.showOtherModal = false;
      localStorage.setItem('username', this.loginId);
    }
    else {
      this.toastr.error('Invalid OTP!!')
      this.validityFlag = false;
    }
  }
  
  initializeForm() {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    })
    this.changePasswordForm.controls.password.valueChanges.subscribe(() => {
      this.changePasswordForm.controls.confirmPassword.updateValueAndValidity();
    })
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true }
    }
  }

  changePassword() {
    let updatePasswordUrl = 'http://localhost:5000/api/v1.0/TweetApp/'+'resetPassword'
    let loginId = localStorage.getItem('username');
    let jsonPayload = {
      loginId: loginId,
      password: this.changePasswordForm.value.password
    }
    if (this.changePasswordForm.valid) {
        this.http.post(updatePasswordUrl, jsonPayload).subscribe(result => {
        this.toastr.success('Updated Successfully');
        localStorage.removeItem('username');
        let dialogRef = this.dialog.closeAll()
      },
        error => {
          console.log(error);
          this.toastr.error(error.error);
        })
    }
  }
}
