import { Component, OnInit } from '@angular/core';
import { AuthUser, Workout } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: boolean;
  userData: AuthUser; 
  workoutId: string = "";

  constructor(
    private authService: AuthService,
    private workoutService: WorkoutService
  ){}

  logout(){
    this.authService.logout();
  }


  ngOnInit(): void {
    this.authService.isAuth$.subscribe((isAuth)=>{
      this.token = isAuth;
    });
    this.authService.userData$.subscribe(user => {
      this.userData = user;
    });
    this.workoutService.currentWorkout$.subscribe((currentWorkout) => {
      if(currentWorkout){
        this.workoutId = currentWorkout._id
      }
    });
  }

}
