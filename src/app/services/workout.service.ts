import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, Observable, ReplaySubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Workout, WorkoutExercise } from '../interfaces/interfaces';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  public workouts$: ReplaySubject<{workouts: Workout[]}> = new ReplaySubject<{workouts: Workout[]}>(null);
  public currentWorkout$: ReplaySubject<Workout> = new ReplaySubject<Workout>(null);

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  private httpUrl = environment.apiURL;

  getWorkouts(userId: string): Observable<{workouts: Workout[]}>{
    this.commonService.isFetching$.next(true);
    return this.http.get<{workouts: Workout[]}>(`${this.httpUrl}/api/workout/${userId}`)
    .pipe(tap((workouts) => {
      workouts && this.workouts$.next(workouts);
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }));
  }
  addWorkout(userId: string, exercises: WorkoutExercise[], date: string | number): Observable<{message: string, workout: Workout}>{
    this.commonService.isFetching$.next(true);
    return this.http.post<{message: string, workout: Workout}>(`${this.httpUrl}/api/workout/${userId}`, {exercises, date})
    .pipe(tap((res) => {
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }));
  }
  updateWorkout(id: string, exercises:WorkoutExercise[]): Observable<{workout: Workout}>{
    this.commonService.isFetching$.next(true);
    return this.http.patch<{workout: Workout}>(`${this.httpUrl}/api/workout/${id}`, {exercises})
    .pipe(tap((res) => {
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }));
  }
}
