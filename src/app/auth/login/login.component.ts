import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UIService } from '../../shared/ui.service';


import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
                private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ =   this.store.select(fromRoot.getIsLoading);

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
}
