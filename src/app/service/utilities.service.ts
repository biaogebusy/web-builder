import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  getIndexTitle(title: string): string {
    return title.substring(0, 1);
  }

  get fullYear(){
    return new Date().getFullYear();
  }
}
