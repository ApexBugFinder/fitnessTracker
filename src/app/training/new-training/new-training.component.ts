import { Component, OnInit, OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore'; 
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // availableExercises: Exercise[] = [];
  selected: string;
  availableExercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    // Using FIRESTORE - using valueChanges does not have access to metadata
  //  this.availableExercises = this.dB.collection('availableExercises').valueChanges().subscribe(result => {
  //     console.log('result: ' result);
  //     // this.availableExercises = result;
     
  //   });

  // USING  FIRESTORE snapshotChanges - has access to metadata like the id
  // This code is now in the trainingService and is used in the fetchAvailableExercises
  //  this.availableExercises = this.dB.collection('availableExercises')
  //   .snapshotChanges()
  //   .map(docArray => {
  //     return docArray.map(doc => {
  //       return {
  //         id: doc.payload.doc.id,
  //         name: doc.payload.doc.data().name,
  //         duration: doc.payload.doc.data().duration,
  //         calories: doc.payload.doc.data().calories


  //       };
  //     });
  //   });

  
  this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
    this.availableExercises = exercises;
    console.log(exercises);
  });
  this.trainingService.fetchAvailableExercises();
        


  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    console.log('onStartTraining selected training: ' + form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }
}
