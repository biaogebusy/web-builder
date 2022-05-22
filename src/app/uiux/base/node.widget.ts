import { Injectable } from '@angular/core';
@Injectable()
export abstract class NodeComponent {
  abstract content: any;

  constructor() {}
}
