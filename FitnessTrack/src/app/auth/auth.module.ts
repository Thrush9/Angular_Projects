import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupComponent } from '../components/auth-signup/auth-signup.component';
import { AuthLoginComponent } from '../components/auth-login/auth-login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AuthSignupComponent,
    AuthLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
  ]
})
export class AuthModule { }
