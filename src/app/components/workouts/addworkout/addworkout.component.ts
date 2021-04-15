import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise, Workout, WorkoutExercise } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.component.html',
  styleUrls: ['./addworkout.component.css']
})
export class AddworkoutComponent implements OnInit {
  exercises: Exercise[] = [];
  workout: WorkoutExercise[];
  userId: string;
  currentDate: string;

  presentationDate: string = "";

  constructor(
    private workoutService: WorkoutService,
    private authService: AuthService,
    private exerciseService: ExerciseService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.commonService.currentDate$.subscribe((currentDate) => {
      this.currentDate = currentDate;

      let date = new Date(this.currentDate);
      let year = date.getFullYear();
      let month: number | string = date.getMonth()+1;
      if(month < 10){
        month = "0" + month;
      }
      let day: number | string = date.getDate();
      if(day < 10){
        day = "0" + day;
      }
      this.presentationDate = day + "/" + month + "/" + year;

      if(!this.currentDate){
        this.router.navigate(['/dashboard']);
      }
    });
    
    this.authService.userData$.subscribe((userData) => {
      this.userId = userData._id
      this.exerciseService.getExercises(this.userId).subscribe((data) => {
        this.exercises = data.exercises;
        this.workout = [{exercise: this.exercises[0]._id, repeats: 0, measurement: 0}];
      });
      
    });
  }

  addEx(){
    this.workout.push({exercise: this.exercises[0]._id, repeats: 0, measurement: 0})
  }

  deleteEx(exInfo: any): void {
    if(this.workout.length > 1){
      this.workout.forEach((ex, index) => {
        if(exInfo.index === index){
          this.workout.splice(index, 1);
        }
      })
    }
  }

  moveUp(exIndex: number): void{
    this.workout.forEach((ex, index) => {
      if(exIndex === index && index > 0){
        let tmpEx = this.workout[index - 1];
        this.workout[index - 1] = ex;
        this.workout[index] = tmpEx;
      }
    });
  }

  moveDown(exIndex: number): void{
    let count = 0;
    this.workout.forEach((ex, index) => {
      if(exIndex === index){
        let tmpEx = this.workout[index + 1];
        if(tmpEx && count === 0){
          this.workout[index + 1] = ex;
          this.workout[index] = tmpEx;
          count++;
        }
      }
    });
  }

  addWorkout(){
    let date = this.currentDate.toString();
    this.workoutService.addWorkout(this.userId, this.workout, date)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err.error.message);
    });
  }
}
