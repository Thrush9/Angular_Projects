import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/models/Exercise';
import { TrainingService } from 'src/app/services/training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {


  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private pastExercisesSubscription: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getPastExercises();
    this.pastExercisesSubscription = this.trainingService.pastExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      })

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(e) {
    let search = e.target.value;
    this.dataSource.filter = search.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.pastExercisesSubscription) {
      this.pastExercisesSubscription.unsubscribe();
    }
  }

}
