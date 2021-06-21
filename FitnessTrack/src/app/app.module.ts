import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';

//import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
//import { AuthLoginComponent } from './components/auth-login/auth-login.component';
//import { TrainingComponent } from './components/training/training.component';
//import { CurrentTrainingComponent } from './components/current-training/current-training.component';
//import { NewTrainingComponent } from './components/new-training/new-training.component';
//import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
//import { StopTrainingComponent } from './components/current-training/stop-training.component'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { UIService } from './services/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    // AuthSignupComponent,
    // AuthLoginComponent,
    // TrainingComponent,
    // CurrentTrainingComponent,
    // NewTrainingComponent,
    // PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
    //StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    //FormsModule,
    //ReactiveFormsModule,
    AuthModule,
    TrainingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
