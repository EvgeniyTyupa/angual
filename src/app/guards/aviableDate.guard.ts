import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CommonService } from "../services/common.service";


@Injectable({
    providedIn: 'root'
})

export class AvaibleDateGuard implements CanActivate{
    constructor(
        private commonService: CommonService,
        private router: Router
    ){ }

    isAviableDate: boolean;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.commonService.isAviableDate$.subscribe((isAviableDate) => {
            this.isAviableDate = isAviableDate;
        });
        if(!this.isAviableDate){
            this.router.navigate(['/dashboard']);
        }
        return this.isAviableDate ? true : false;
    }
}