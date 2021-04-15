import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }
  public isFetching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentDate$: BehaviorSubject<string> = new BehaviorSubject<string>(new Date().toString());
  public isAviableDate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
