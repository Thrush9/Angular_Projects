import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { FormsModule } from '@angular/forms' ;

import { environment } from '../environments/environment';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClientService } from './services/client.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    ClientsComponent,
    AddClientComponent,
    EditClientComponent,
    NotFoundComponent,
    ClientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase,'ClientPanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot() 

  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
