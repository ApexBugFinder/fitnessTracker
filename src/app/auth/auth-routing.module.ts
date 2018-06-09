import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { A1ReactFormComponent } from './a1-react-form/a1-react-form.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component'; 

const routes: Routes= [
    { path: 'a1', component: A1ReactFormComponent   },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})
export class AuthRoutingModule {}