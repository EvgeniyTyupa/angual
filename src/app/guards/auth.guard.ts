import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){ }

    isAuth:boolean;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
        this.authService.isAuth$.subscribe((isAuth) => {
            this.isAuth = isAuth;
        });
        if (!this.isAuth) {
            this.router.navigate(['/login']);
        }
        return this.isAuth ? true : false;
    }
}