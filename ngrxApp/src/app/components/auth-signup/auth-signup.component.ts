import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {

  maxDate: any;
  //isLoading = false;
  isLoading$: Observable<boolean>;
  private loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    //this.loadingSub = this.uiService.loadingStateChanged.subscribe(res => this.isLoading = res);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.authService.registerUser({ email: form.value.email, password: form.value.email });
    }

  }

  // ngOnDestroy() {
  //   if (this.loadingSub) {
  //     this.loadingSub.unsubscribe();
  //   }
  // }

}
