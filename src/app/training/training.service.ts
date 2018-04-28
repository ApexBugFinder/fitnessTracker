import { Exercise } from "./exercise.model";
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { error } from "util";
import { UIService } from "../shared/ui.service";


@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
      { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
      { id: 'burpees', name: 'Burpees', duration: 60, calories: 8}    
    ];

    private fbSubs: Subscription[] = [];
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private runningExercise: Exercise;
    
    constructor(private dB: AngularFirestore, private uiService: UIService) {}

    

  
    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
        console.log('hi');
        this.fbSubs.push(
        this.dB.collection('availableExercises')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories


        };
      });
    }).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
        this.uiService.loadingStateChanged.next(false);
    }, error => {
        this.uiService.loadingStateChanged.next(false);
        console.log(error);
    }));
    // copies objects
    // return { ...this.availableExercises};
    // copies arrays
    // return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        // this.dB.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
        this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
        console.log('Start Exercise: ' + this.runningExercise);
        this.exerciseChanged.next({...this.runningExercise});
    }

    getRunningExercise() {
        return { ...this.runningExercise};
    }

    completeExercise() {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);

    }
    cancelExercise(progress: number) {
        this.addDataToDatabase({
                ...this.runningExercise, 
                date: new Date(), 
                state: 'cancelled',
                duration: this.runningExercise.duration * (progress / 100)  ,
                calories:  this.runningExercise.calories * (progress / 100)
            });
            console.log('duration: ' + this.runningExercise.duration * ( progress / 100 ) );
            console.log('calories: ' + this.runningExercise.calories * ( progress / 100) );
            this.runningExercise = null;
            this.exerciseChanged.next(null);
    }

    fetchCompletedOrCancelledExercises(){
        this.fbSubs.push(this.dB.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
            }, error => {
                console.log(error);
            }));

    }

    private addDataToDatabase(exercise: Exercise) {
        this.dB.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}