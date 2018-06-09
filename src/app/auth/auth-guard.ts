import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        // has to returns true or a Promise that 
        // resolves to true or an Observable that resolves to true
        
        // return true;

        // use the authService to check to see if there is a user logged in
        // if there is then return the result from method which is a boolean
        // if not isAuth is null and we will route the user to the login page
        if (this.authService.isAuth()){
        return this.authService.isAuth();
        } else {
            this.router.navigate(['/login']);
        }
    }
    canLoad(route: Route){
        if (this.authService.isAuth()){
            return this.authService.isAuth();
            } else {
                this.router.navigate(['/login']);
            }
    }
}