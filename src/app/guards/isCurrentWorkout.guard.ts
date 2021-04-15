import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Workout } from "../interfaces/interfaces";
import { WorkoutService } from "../services/workout.service";

@Injectable({
    providedIn: 'root'
})

export class CurrentWorkoutGuard implements CanActivate{
    constructor(
        private workoutService: WorkoutService,
        private router: Router
    ){ }
    currentWorkout: Workout;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.workoutService.currentWorkout$.subscribe((currentWorkout) => {
            this.currentWorkout = currentWorkout;
        });
        if(!this.currentWorkout){
            this.router.navigate(['/dashboard']);
        }
        return this.currentWorkout ? true : false;
    }
}