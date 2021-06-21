import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  loginForm: any;
  //isLoading = false;
  isLoading$: Observable<boolean>;
  private loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    //this.loadingSub = this.uiService.loadingStateChanged.subscribe(res => this.isLoading = res);
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.email, Validators.required] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.authService.login({ email: form.value.email, password: form.value.email });
    }
  }

  // ngOnDestroy() {
  //   if (this.loadingSub) {
  //     this.loadingSub.unsubscribe();
  //   }
  // }
}
