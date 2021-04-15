import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/api.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExercisesComponent } from './components/exercises/view/exercises.component';
import { WorkoutsComponent } from './components/workouts/view/workouts.component';
import { AddworkoutComponent } from './components/workouts/addworkout/addworkout.component';
import { AddexerciseComponent } from './components/exercises/addexercise/addexercise.component';
import { ExerciseComponent } from './components/exercises/view/exercise/exercise.component';
import { InfiniteCalendarModule } from 'ng-infinite-calendar';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { ExerciseworkoutComponent } from './components/workouts/exerciseworkout/exerciseworkout.component';



const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ExercisesComponent,
    WorkoutsComponent,
    AddworkoutComponent,
    AddexerciseComponent,
    ExerciseComponent,
    PreloaderComponent,
    ExerciseworkoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    InfiniteCalendarModule,
  ],
  providers: [ AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
