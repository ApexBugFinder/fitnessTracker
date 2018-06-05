import {NgModule} from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrainingComponent } from './training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingService } from './training.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ 
        CurrentTrainingComponent, 
        NewTrainingComponent,
        PastTrainingComponent,
        TrainingComponent,
        StopTrainingComponent,
        
        ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AngularFirestoreModule


    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}