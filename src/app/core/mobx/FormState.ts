import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormState {
  autoList$: Subject<any[]> = new Subject();
}
