import { Exercise } from './exercise.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { error } from 'util';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import { take } from 'rxjs/operators';

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

    constructor(private dB: AngularFirestore,
                private uiService: UIService,
                private store: Store<fromTraining.State>) {}


    fetchAvailableExercises() {

        this.store.dispatch(new UI.StartLoading());
        console.log('hi');
        this.fbSubs.push(
            this.dB.collection('availableExercises')
                .snapshotChanges()
                .map(docArray => {

                    // throw(new Error());
                    return docArray.map(doc => {
                        return {
                            name: doc.payload.doc.data().name,
                            id: doc.payload.doc.id,
                            duration: doc.payload.doc.data().duration,
                            calories: doc.payload.doc.data().calories


                        };
                    });
                }).subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableTrainings(exercises));
                },
                    error => {
                        this.uiService.showSnackBar('Fetching Excerises failed, please try again later', null, 3000);
                        // this.uiService.loadingStateChanged.next(false);
                        this.store.dispatch(new UI.StopLoading());
                        this.exercisesChanged.next(null);
                        console.log(error);
                    }));
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });

    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        });

    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.dB.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
              this.store.dispatch(new Training.SetFinishedTrainings(exercises));
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
