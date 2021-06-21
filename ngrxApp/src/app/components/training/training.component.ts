import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from 'src/app/services/training.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  //ongoingTraining = false;
  ongoingTraining$: Observable<boolean>;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromRoot.getIsTraining);
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exe => {
    //   if (exe) {
    //     this.ongoingTraining = true;
    //   } else {
    //     this.ongoingTraining = false;
    //   }
    // });
  }

  // ngOnDestroy() {
  //   if (this.exerciseSubscription) {
  //     this.exerciseSubscription.unsubscribe();
  //   }
  // }

}
