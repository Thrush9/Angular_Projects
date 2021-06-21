import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-stop-training',
    templateUrl: './stop-training.component.html'
})
export class StopTrainingComponent {

    constructor(
        public dialogRef: MatDialogRef<StopTrainingComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

}