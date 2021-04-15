import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise, Workout, WorkoutExercise } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  workout: WorkoutExercise[];
  workouts: Workout[];
  currentDate: string;
  exercises: Exercise[] = [];
  workoutId: string;

  presentationDate: string = "";

  private routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private commonService: CommonService,
    private exerciseService: ExerciseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.workoutService.workouts$.subscribe((workouts) => {
      this.workouts = workouts.workouts;
    });
    this.routeSub = this.route.params.subscribe(params => {
      this.workouts.forEach(workout => {
        if(workout._id === params.id){
          this.workoutId = params.id;
          this.workout = workout.exercises;
        }
      });
    });
    this.exerciseService.exercises$.subscribe((exercises) => {
      this.exercises = exercises;
    });
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
    });
  }

  addEx(){
    this.workout.push({exercise: this.exercises[0]._id, repeats: 0, measurement: 0});
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

  deleteEx(exInfo: any): void{
    if(this.workout.length > 1){
      this.workout.forEach((ex, index) => {
        if(exInfo.index === index){
          this.workout.splice(index, 1);
        }
      })
    }
  }

  updateWorkout(){
    this.workoutService.updateWorkout(this.workoutId, this.workout).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err.error.message);
    })
  }

}
