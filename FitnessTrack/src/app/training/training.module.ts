import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentTrainingComponent } from '../components/current-training/current-training.component';
import { NewTrainingComponent } from '../components/new-training/new-training.component';
import { PastTrainingsComponent } from '../components/past-trainings/past-trainings.component';
import { TrainingComponent } from '../components/training/training.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { StopTrainingComponent } from '../components/current-training/stop-training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
