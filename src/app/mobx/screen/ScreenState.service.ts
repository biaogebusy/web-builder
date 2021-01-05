import { Injectable } from '@angular/core';
import { Subject,fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenState {
  public scroll$ = new Subject;

  constructor() {
    this.initBrowserEvents()
  }

  initBrowserEvents(){
    const scroll = fromEvent(window, 'scroll').pipe(
      debounceTime(200)
    ).subscribe(()=>{
      this.scroll$.next();
    })
  }
}
