import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthData } from '../models/AuthData';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from './training.service';
import { UIService } from './ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../reducers/ui.action';
import * as Auth from '../reducers/auth.action'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService, private store: Store<fromRoot.State>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        //this.isAuthenticated = true;
        //this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions();
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(res => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(res => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }).catch(error => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  private authSucess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training'])
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUSer() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
