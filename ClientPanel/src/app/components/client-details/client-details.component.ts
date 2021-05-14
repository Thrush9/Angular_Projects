import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id : string;
  client : Client;
  hasBalance : boolean = false;
  showBalanceUpdateInput : boolean = false;

  constructor(private flashMessage: FlashMessagesService, 
    private clientService : ClientService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
    
  }

  onDelete(){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client deleted successfully!', {
        cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
    }
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated successfully!', {
      cssClass: 'alert-success', timeout: 3000 });
  }

}
