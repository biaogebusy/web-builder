import { Injectable } from '@angular/core';
import { ICard1v1 } from '@core/interface/widgets/ICard';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuilderState {
  public showcase$: Subject<ICard1v1> = new Subject();
}
