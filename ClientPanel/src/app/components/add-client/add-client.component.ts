import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client : Client = {
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
    balance : 0
  }

  disableBalanceOnAdd: boolean = true;

  @ViewChild('clientForm') form : any;

  constructor(private flashMessage: FlashMessagesService, 
              private clientService : ClientService,
              private settingsService :  SettingsService,
              private router : Router) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    } 
    if(!valid){
      this.flashMessage.show('Please fill out Form correctly!', {
         cssClass: 'alert-danger', timeout: 3000 });
    }else{
      this.clientService.newClient(value);
      this.flashMessage.show('New client added successfully!', {
        cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['/']);  
    }
  }

}
