import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from 'src/app/services/training.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: any = 0;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private trainingService: TrainingService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromRoot.getActiveExercise).pipe(take(1)).subscribe(exe => {

      const step = exe.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 1
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);

    });
  }


  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '250px',
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    })
  };

}
