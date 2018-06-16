import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth} from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
// imports everything from the app.Reducer file and can be access through fromApp
import * as fromApp from '../app.reducer';



@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        // added access to global store
        private store: Store<{ui: fromApp.State}>) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        })
    }
    registerUser(authData: AuthData) {
        // uiService
        // this.uiService.loadingStateChanged.next(true);
        // using redux managed slice to dispatch/tell all parties that the state has changed
        this.store.dispatch({type: 'START_LOADING'});
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // using uiService managed state
            // this.uiService.loadingStateChanged.next(false);
            // using redux's ui managed state in the appReducer store, everyone listening
            // to the store will hear the false boolean emitted by the case STOP_LOADING case
            // in the form of the isLoading property
            this.store.dispatch({type: 'STOP_LOADING'});
            console.log(result);
        }).catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
            console.log(result);
        }).catch(error => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
            this.uiService.showSnackBar(error.message, null, 3000);
        });
}
logout() {
    this.afAuth.auth.signOut();
}




isAuth() {
    return this.isAuthenticated;
}


}
