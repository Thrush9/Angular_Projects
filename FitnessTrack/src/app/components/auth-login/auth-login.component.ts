import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  loginForm: any;
  isLoading = false;
  private loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(res => this.isLoading = res);
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

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
