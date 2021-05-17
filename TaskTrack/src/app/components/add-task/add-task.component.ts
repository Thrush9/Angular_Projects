import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean ;
  subscription: Subscription;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((rem) => {
    this.showAddTask = rem;
});  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.text){
      alert('Please Add Text');
      return;
    }
    const newTask = {
      text : this.text,
      day : this.day,
      reminder : this.reminder
    }
    this.onAddTask.emit(newTask);
    this.text = '';
    this.day = '';
    this.reminder = false ;


  }

}
