import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs : Log[] ;

  private logSource = new BehaviorSubject<Log>( { id : null, text : null, date : null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<Boolean>(true);
  selectedState = this.stateSource.asObservable();

  constructor() { 
    this.logs = [
      { id : '1', text : 'Start Coding', date : new Date('01-05-2021') },
      { id : '2', text : 'Angular', date : new Date('02-05-2021') },
      { id : '3', text : 'Java', date : new Date('03-05-2021') }
     ]
  }

  getLogs() : Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log : Log){
    this.logSource.next(log);
  }

  addLog(log : Log) {
    this.logs.unshift(log);
    //Add to local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  updateLog(log : Log) {
    this.logs.forEach((cur,index) =>{
     if(log.id === cur.id){
       this.logs.splice(index,1);
     }
    });
    this.logs.unshift(log);
  }

  deleteLog(log : Log){
    this.logs.forEach((cur,index) =>{
      if(log.id === cur.id){
        this.logs.splice(index,1);
      }
     });
  }

  clearState(){
   this.stateSource.next(true);
  }
}
