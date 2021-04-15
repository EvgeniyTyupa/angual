import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = []
  userId: string;
  data;

  private subscriptions: Subscription = new Subscription();
  private subscription: Subscription = new Subscription();

  constructor(
    private exerciseService: ExerciseService, 
    private authService: AuthService) { }

  

  ngOnInit(): void {
    this.exerciseService.exercises$.subscribe((exercises) => {
      this.exercises = exercises;
    })
    this.subscription.add(
      this.subscription = this.authService.userData$.subscribe((userData) => {
        this.userId = userData._id;
        this.getExercises();
      })
    );
    
  }

  private getExercises(): void {
    this.subscriptions.add(
      this.exerciseService.getExercises(this.userId).subscribe((data) => {
        this.exercises = data.exercises;
      }, 
      error => {
        console.log(error.error.message)
      })
    );
  }

  updateExercises(){
    this.exerciseService.updateExercise(this.exercises).subscribe((res) => {
      this.exercises = res.exercises;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.subscription.unsubscribe();
  }
}
