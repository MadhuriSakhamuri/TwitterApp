import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  decodedToken: any;

  constructor(private http: HttpClient,  private toastr: ToastrService) { }
  login(model: any) {    
    return this.http.post('http://localhost:5000/api/v1.0/TweetApp/login', model).pipe(
      map((response: any) => {
        if (response == "Login Id is incorrect..!!") {
          this.toastr.error(response);
        }
        else if (response == "Password is incorrect..!!") {
          this.toastr.error(response);
        }
        else {
          // console.log("Error:::",response);
          const user = response;

          if (user) {
            localStorage.setItem('token', user);
            this.decodedToken = localStorage.getItem('token');

            console.log(this.decodedToken);
          }
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token != null) {
      return true;

    }
    else {
      return false;
    }
  }

}



