import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { A1ReactFormComponent } from './a1-react-form/a1-react-form.component';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [ 
        LoginComponent, 
        SignupComponent,
        A1ReactFormComponent
    ],
    imports: [ 
                SharedModule,
                ReactiveFormsModule,
                
                AngularFireAuthModule
            ],
    exports: []
})
export class AuthModule {}