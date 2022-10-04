import { Injectable } from '@angular/core';
import type { IMark } from '@core/interface/IAmap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AMapState {
  position$ = new Subject();
  markers$: Subject<IMark> = new Subject();
  constructor() {}
}
