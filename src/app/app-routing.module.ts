import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/notAuth.guard';
import { ExercisesComponent } from './components/exercises/view/exercises.component';
import { AddexerciseComponent } from './components/exercises/addexercise/addexercise.component';
import { WorkoutsComponent } from './components/workouts/view/workouts.component';
import { AddworkoutComponent } from './components/workouts/addworkout/addworkout.component';
import { AvaibleDateGuard } from './guards/aviableDate.guard';
import { CurrentWorkoutGuard } from './guards/isCurrentWorkout.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'exercise/view', component: ExercisesComponent, canActivate: [AuthGuard] },
  { path: 'exercise/add', component: AddexerciseComponent, canActivate: [AuthGuard] },
  { path: 'workouts/view/:id', component: WorkoutsComponent, canActivate: [AuthGuard, CurrentWorkoutGuard] },
  { path: 'workouts/add', component: AddworkoutComponent, canActivate: [AuthGuard, AvaibleDateGuard] }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
