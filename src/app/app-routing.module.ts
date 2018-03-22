import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components 
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { A1ReactFormComponent } from './auth/a1-react-form/a1-react-form.component';



// ============================

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'a1', component: A1ReactFormComponent   },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'training', component: TrainingComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}