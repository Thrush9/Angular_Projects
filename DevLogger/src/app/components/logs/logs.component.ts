import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs : Log[] ;
  selectedLog : Log;
  loaded : boolean = false;

  constructor(private logService : LogService) { 
    this.logs = [];
  }

  ngOnInit(): void {
    this.logService.selectedState.subscribe(clear => {
      if (clear){
        this.selectedLog = { id : '', text : '', date :'' }
      }
    });
    this.logService.getLogs().subscribe(logs =>{
      this.logs  = logs;
      this.loaded = true;
    });
  }

  onSelect(log : Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log : Log){
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
    }
  }

}
