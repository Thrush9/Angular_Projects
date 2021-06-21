import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Exercise } from 'src/app/models/Exercise';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  //exercises: Exercise[] = [];
  exercises$: Observable<Exercise[]>;
  //exercises: Observable<any>;
  exercisesSubscription: Subscription;
  //isLoading = true;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
    private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.fetchExercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromRoot.getAvailableExercises);
    // this.exercisesSubscription = this.trainingService.exercisesChanged.
    //   subscribe(res => {
    //     this.exercises = res
    //     //this.isLoading = false;
    //   });

    //this.exercises = this.afs.collection('availableExercises').valueChanges();
    // this.exercises = this.afs.collection('availableExercises').snapshotChanges().pipe(
    //   map(docArray => docArray.map(doc => {
    //     const data = doc.payload.doc.data() as Exercise;
    //     const id = doc.payload.doc.id;
    //     return { id, ...data };
    //   }
    //   ))
    // );
  }

  fetchExercises() {
    this.trainingService.getExercises();
  }

  onStartTraining(form) {
    if (form.valid) {
      this.trainingService.startExercise(form.value.exercise);
    }
    //this.trainingStart.emit();
  }

  // ngOnDestroy() {
  //   if (this.exercisesSubscription) {
  //     this.exercisesSubscription.unsubscribe();
  //   }
  // }

}
