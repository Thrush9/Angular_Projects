import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   title: string = 'TaskTrack';
   showAddTask: boolean ;
   subscription: Subscription;
   
  constructor(private uiService: UiService, private router: Router) { 
    this.subscription = this.uiService.onToggle().subscribe((rem) => {
         this.showAddTask = rem;
    }); 
  }

  ngOnInit(): void {
  }

  toggleAddTask(){
   this.uiService.toggleAddTask();
  }

  hasRoute(route: String){
     return this.router.url === route;
  }

}
