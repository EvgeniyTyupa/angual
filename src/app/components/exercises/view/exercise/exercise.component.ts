import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;

  options: string[] = ["meters", "kilograms", "time"];
  selectedOption: string;

  currentValue: string;

  exercises: Exercise[] = [];
  
  constructor(
    private exerciseService: ExerciseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentValue = this.exercise.title;
    this.selectedOption = this.exercise.measurement;
    this.exerciseService.exercises$.subscribe((exercises) => {
      this.exercises = exercises;
    })
  }

  handleSelect(option: string){
    this.selectedOption = option;
    this.exercises.forEach((ex, index) => {
      if(this.exercise._id === ex._id){
        this.exercises[index].measurement = this.selectedOption;
      }
    });
  }

  handleInput(value: string){
    this.exercises.forEach((ex, index) => {
      if(this.exercise._id === ex._id){
        this.exercises[index].title = value;
      }
    });
  }

  moveUp(){
    this.exercises.forEach((ex, index) => {
      if(this.exercise._id === ex._id && index > 0){
        let tmpEx = this.exercises[index - 1];
        this.exercises[index - 1] = ex;
        this.exercises[index] = tmpEx;
      }
    });
  }
  moveDown(){
    let count = 0;
    this.exercises.forEach((ex, index) => {
      if(this.exercise._id === ex._id){
        let tmpEx = this.exercises[index + 1];
        if (tmpEx && count === 0) {
          this.exercises[index + 1] = ex;
          this.exercises[index] = tmpEx;
          count++;
        }
      }
    });
  }
  deleteEx(){
    this.exercises.forEach((ex, index) => {
      if(this.exercise._id === ex._id){
        this.exerciseService.deleteExercise(ex._id).subscribe((res) => {
          this.exercises.splice(index, 1);
        }, error => {
          console.log(error.error.message)
        })
      }
    });
  }
}
