import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from '../models/AuthData';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';

import { UIService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(res => {
      this.uiService.loadingStateChanged.next(false);
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    // this.authSucess();
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {
      //this.authSucess();
      this.uiService.loadingStateChanged.next(false);
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  private authSucess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }

  logout() {
    //this.user = null;
    //this.trainingService.cancelSubscriptions();
    this.afAuth.auth.signOut();
    // this.isAuthenticated = false;
    // this.authChange.next(false);
    // this.router.navigate(['/login'])
  }

  getUSer() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
