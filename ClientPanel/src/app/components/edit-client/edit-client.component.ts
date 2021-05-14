import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id : string ;
  disableBalanceOnEdit : boolean = true;
  client : Client = {
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
    balance : 0
  }

  constructor(private flashMessage: FlashMessagesService, 
    private clientService : ClientService,
    private router : Router,
    private settingsService :  SettingsService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value,valid}:{value:Client,valid:boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out Form correctly!', {
        cssClass: 'alert-danger', timeout: 3000 });
    }else{
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show('client edited successfully!', {
        cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/client/'+this.id]);  
    }
  }

}
