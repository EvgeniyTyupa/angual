import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, empty, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthUser, User } from '../interfaces/interfaces';
import { CommonService } from './common.service';
import { ExerciseService } from './exercise.service';
import { WorkoutService } from './workout.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userData$: ReplaySubject<AuthUser> = new ReplaySubject<AuthUser>();
  public isStartUserData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService
  ){ 
    localStorage.usertoken ? 
      this.isAuth$.next(true) :
      this.isAuth$.next(false)
  }


  private httpUrl = environment.apiURL;

  register(email: string, password: string): Observable<{message: string, link: string, code: string}>{
    return this.http.post<{message: string, link: string, code: string}>(`${this.httpUrl}/api/auth/register`, {email, password})
  }

  login(email: string, password: string): Observable<{token: string}>{
    this.commonService.isFetching$.next(true);
    return this.http.post<{token: string}>(`${this.httpUrl}/api/auth/login`, {email, password})
    .pipe(
      tap((token)=>{
        this.commonService.isFetching$.next(false);
        token && this.isAuth$.next(true);
      }), catchError((err, caught) => {
        this.commonService.isFetching$.next(false);
        return empty();
      }))
  }

  getAuthUserData(): Observable<AuthUser>{
    this.commonService.isFetching$.next(true);
    return this.http.get<AuthUser>(`${this.httpUrl}/api/auth/me`)
    .pipe(
      tap((userData)=>{
        console.log(userData)
        if (userData) {
          this.userData$.next(userData);
          this.isStartUserData$.next(true);
          this.exerciseService.exercises$.next(userData.exercises);
          this.workoutService.workouts$.next(userData.workouts);
          this.commonService.isFetching$.next(false);
        }
      }), catchError((err, caught) => {
        this.commonService.isFetching$.next(false);
        return empty();
      })
    )
  }

  logout(){
    localStorage.clear();
    this.isAuth$.next(false);
    this.router.navigate(['/login']);
  }
}
