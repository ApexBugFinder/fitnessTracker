import { Component, OnInit, OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';


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
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) { }

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
  this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
  //   this.isLoading = isLoading;
  // });
  this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
    this.availableExercises = exercises;
    console.log(exercises);
  });

  this.fetchExercises();



  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    // if (this.loadingSubs) {
    //   this.loadingSubs.unsubscribe();
    // }
  }

  onStartTraining(form: NgForm) {
    console.log('onStartTraining selected training: ' + form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }
}
