import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogState$ = new Subject();
  constructor() {}

  closeDialog(): void {
    this.dialogState$.next(false);
  }
}
