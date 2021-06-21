import { Injectable } from '@angular/core';
import { Exercise } from '../models/Exercise';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  // private availableExercises: Exercise[] = [
  //   { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
  //   { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
  //   { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
  //   { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  // ]
  private availableExercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  pastExercisesChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  private pastExercises: Exercise[] = [];
  private fbSubs: Subscription[] = [];

  constructor(private afs: AngularFirestore, private uiService: UIService) { }

  getExercises() {
    //const exercises = this.availableExercises.slice();
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.afs.collection('availableExercises').snapshotChanges().pipe(
      map(docArray =>
        docArray.map(doc => {
          const data = doc.payload.doc.data() as Exercise;
          const id = doc.payload.doc.id;
          return { id, ...data };
        })
        //throw new Error('Not able to get exercises');
      )).subscribe(results => {
        this.availableExercises = results;
        this.uiService.loadingStateChanged.next(false);
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.exercisesChanged.next(null);
        this.uiService.showSnackbar(error.message, null, 3000);
      }));
    //return this.availableExercises;
  }


  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exe => exe.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    //this.exercises.push({
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    //this.exercises.push({
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getPastExercises() {
    this.fbSubs.push(this.afs.collection('pastExercises')
      .valueChanges().subscribe((exercises: Exercise[]) => {
        this.pastExercisesChanged.next(exercises)
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.pastExercisesChanged.next(null);
        this.uiService.showSnackbar(error.message, null, 3000);
      }));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.afs.collection('pastExercises').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
