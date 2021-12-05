import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AmapService } from '@core/service/amap.service';

@Injectable({
  providedIn: 'root',
})
export class AMapState {
  position$ = new Subject();
  markers$ = new Subject();
  constructor(public amapService: AmapService) {}
}
