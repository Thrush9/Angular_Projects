import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TASKS } from '../models/mock-task';
import { Task } from '../models/Task';

const httpHeaders = {
  headers : new HttpHeaders({ 'Content-Type' : 'application/json'}) 
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  task: Task;
  tasks: Task[];
  private apiUrl: string = "http://localhost:5000/tasks";
  

  constructor(private http : HttpClient) { }

  getTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url,task,httpHeaders);
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl,task,httpHeaders);
  }
}
