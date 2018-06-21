// import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
    // not needed because using the redux pattern
    // loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) {}

    showSnackBar(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}
