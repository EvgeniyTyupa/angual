import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../interfaces/interfaces';
import { catchError, tap } from 'rxjs/operators';
import { CommonService } from './common.service';

export interface IExerciseData {
  exercises: Exercise[]
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public exercises$: ReplaySubject<Exercise[]> = new ReplaySubject<Exercise[]>();

  constructor(
    private http: HttpClient,
    private commonService: CommonService) { }

  private httpUrl = environment.apiURL;

  getExercises(userId: string): Observable<IExerciseData>{
    this.commonService.isFetching$.next(true);
    return this.http.get<IExerciseData>(`${this.httpUrl}/api/exercise/${userId}`)
    .pipe(tap((data) => {
      data.exercises && this.exercises$.next(data.exercises);
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }));
  }

  addExercise(userId: string, title: string, measurement: string): Observable<{message: string, exercise: Exercise}>{
    this.commonService.isFetching$.next(true);
    return this.http.post<{message: string, exercise: Exercise}>(`${this.httpUrl}/api/exercise/${userId}`, {title, measurement})
    .pipe(tap((res) => {
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }))
  }

  updateExercise(exercises: Exercise[]): Observable<{message: string, exercises: Exercise[]}>{
    this.commonService.isFetching$.next(true);
    return this.http.patch<{message: string, exercises: Exercise[]}>(`${this.httpUrl}/api/exercise/`, {exercises})
    .pipe(tap((res) => {
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }))
  }

  deleteExercise(ex_id: string): Observable<{message: string}>{
    this.commonService.isFetching$.next(true);
    return this.http.delete<{message: string}>(`${this.httpUrl}/api/exercise/${ex_id}`)
    .pipe(tap((res) => {
      this.commonService.isFetching$.next(false);
    }), catchError((err, caught) => {
      this.commonService.isFetching$.next(false);
      return empty();
    }))
  }
}
