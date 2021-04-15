import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-auth';
  isAuth: boolean = false;
  isFetching: boolean = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService){ }

  ngOnInit(): void{
    this.authService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
    this.commonService.isFetching$.subscribe((isFetching) => {
      this.isFetching = isFetching
    });
    if(this.isAuth){
      this.authService.getAuthUserData()
        .subscribe((res) => {

        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
