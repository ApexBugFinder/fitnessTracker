import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
// imports everything from the app.Reducer file and can be access through fromApp
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

import * as Auth from './auth.actions';



@Injectable()
export class AuthService {
    private user: User;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<{ ui: fromRoot.State }>) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new Auth.SetUnAuthenticated());
                this.router.navigate(['/login']);
            }
        });
    }
    registerUser(authData: AuthData) {

        // using redux managed slice to dispatch/tell all parties that the state has changed
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // using uiService managed state
            // this.uiService.loadingStateChanged.next(false);
            // using redux's ui managed state in the appReducer store, everyone listening
            // to the store will hear the false boolean emitted by the case STOP_LOADING case
            // in the form of the isLoading property
            this.store.dispatch(new UI.StopLoading());
            console.log(result);
        }).catch(error => {

            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                console.log(result);
            }).catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }
    logout() {
        this.afAuth.auth.signOut();
    }


}
