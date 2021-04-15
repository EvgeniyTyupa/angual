import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class NoAuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){ }
    isAuth: boolean;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
        this.authService.isAuth$.subscribe((isAuth) => {
            this.isAuth = isAuth;
        });
        if(this.isAuth){
            this.router.navigate(['/']);
        }
        return this.isAuth ? false : true;
    }
}