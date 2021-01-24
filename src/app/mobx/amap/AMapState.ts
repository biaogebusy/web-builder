import { Inject, Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx-angular';
import { Subject } from 'rxjs';
import { AmapService } from '../../service/amap.service';

@Injectable({
  providedIn: 'root',
})
export class AMapState {
  position$ = new Subject();
  markers$ = new Subject();
  constructor(public amapService: AmapService) {}
}
