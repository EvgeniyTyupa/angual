import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthUser, Workout } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: AuthUser;
  workouts: Workout[];
  userId: string;
  currentDate: string;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.commonService.currentDate$.subscribe((currentDate) => {
      this.currentDate = currentDate; 
    });
    this.authService.userData$.subscribe((userData) => {
      this.userId = userData._id;
      this.getWorkouts(this.userId);
      this.getExercises(this.userId);
    });
    this.workoutService.workouts$.subscribe((workouts) => {
      this.workouts = workouts.workouts;
    })

  }

  getExercises(userId: string){
    this.exerciseService.getExercises(userId).subscribe((exercises) => {

    });
  }

  getWorkouts(userId: string){
    this.workoutService.getWorkouts(userId).subscribe((workouts) => {
      this.workouts = workouts.workouts;
      this.checkDate(this.currentDate);
    })
  }

  checkDate(date: string) {
    let isAviableNewWorkout = false;

    let selectedDate = new Date(date);
    let dateData = this.parseDate(selectedDate);
    let dateToCompare = new Date(Number(dateData[0]), Number(dateData[1]), Number(dateData[2]));

    this.workouts.forEach(workout => {
      let workoutDate = new Date(workout.date);
      let workoutDateData = this.parseDate(workoutDate);
      let workoutDateToCompare = new Date(Number(workoutDateData[0]), Number(workoutDateData[1]), Number(workoutDateData[2]));
      
      if(workoutDateToCompare.getTime() === dateToCompare.getTime()){
        isAviableNewWorkout = false;
        this.workoutService.currentWorkout$.next(workout);
      }else{
        isAviableNewWorkout = true;
        this.workoutService.currentWorkout$.next(null);
      }
    });
    return isAviableNewWorkout;
  }

  parseDate (date: Date): string[] {
    let YearMonthDay = [];
    YearMonthDay.push(date.getFullYear());
    YearMonthDay.push(date.getMonth()+1);
    YearMonthDay.push(date.getDate());
    return YearMonthDay;
  }

  handleDate(value: any){
    this.commonService.currentDate$.next(value.date.date);
    this.commonService.isAviableDate$.next(this.checkDate(this.currentDate));
  }
}
