import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AMapState {
  position$ = new Subject();
  markers$ = new Subject();
  constructor() {}
}
