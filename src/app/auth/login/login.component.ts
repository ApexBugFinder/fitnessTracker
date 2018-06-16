import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UIService } from '../../shared/ui.service';


import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService,
                private uiService: UIService,
                private store: Store<{ui: fromApp.State}>) { }

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    this.isLoading = isLoading;
  });
    this.loginForm = new FormGroup({
      email: new FormControl(
        '',
        {validators: [Validators.required, Validators.email]
        }),
      password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)]
        })

    });
  }
  onSubmit() {
    console.log(this.loginForm);
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
  ngOnDestroy() {
    if (this.loadingSubs) {
    this.loadingSubs.unsubscribe();
    }
  }


}
