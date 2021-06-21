import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { TrainingComponent } from './components/training/training.component';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: AuthSignupComponent },
  { path: 'login', component: AuthLoginComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
