import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exercise, WorkoutExercise } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exerciseworkout',
  templateUrl: './exerciseworkout.component.html',
  styleUrls: ['./exerciseworkout.component.css']
})
export class ExerciseworkoutComponent implements OnInit {
  @Input() exercise: WorkoutExercise;
  @Input() index: number;
  @Input() workout: WorkoutExercise[];

  @Output() onDelete = new EventEmitter<any>();
  @Output() onMoveUp = new EventEmitter<any>();
  @Output() onMoveDown = new EventEmitter<any>();

  options: Exercise[] = [];
  repeats: number = 0;
  measurement: number = 0;

  currentEx: Exercise;

  isWorkoutId: boolean = false;

  private routeSub: Subscription;
  
  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.isWorkoutId = params.id ? true : false;
    })

    this.exerciseService.exercises$.subscribe((exercises) => {
      this.options = exercises;
      if(this.isWorkoutId){
        exercises.forEach(ex => {
          if(ex._id === this.exercise.exercise.toString()){
            this.currentEx = ex;
          }
        });
        this.repeats = this.exercise.repeats;
        this.measurement = this.exercise.measurement;
      }
      else{
        this.currentEx = this.options[0];
        this.repeats = 0;
        this.measurement = 0;
      }
    });
  }

  handleExercise = (id) => {
    this.options.forEach(ex => {
      if(ex._id === id){
        this.currentEx = ex;
      }
    });
    this.workout.forEach((ex, index) => {
      if(index === this.index){
        ex.exercise = this.currentEx._id;
      }
    });
  }

  handleRepeats = (value) => {
    this.repeats = value;
    this.workout.forEach((ex, index) => {
      if(index === this.index){
        ex.repeats = this.repeats;
      }
    });
  }

  handleMeasurement = (value) => {
    this.measurement = value;
    this.workout.forEach((ex, index) => {
      if(index === this.index){
        ex.measurement = this.measurement;
      }
    });
  }

  moveUp = () => {
    this.onMoveUp.emit(this.index);
  }
  moveDown = () => {
    this.onMoveDown.emit(this.index);
  }
  deleteEx = () => {
    let exFuncInfo = {
      _id: this.currentEx._id,
      index: this.index
    }
    this.onDelete.emit(exFuncInfo);
  }

}
