import { Component, Input, OnInit } from '@angular/core';
import { IShowcase2v1 } from '../../ICombs';
@Component({
  selector: 'app-showcase2v1',
  templateUrl: './showcase2v1.component.html',
  styleUrls: ['./showcase2v1.component.scss'],
})
export class Showcase2v1Component implements OnInit {
  @Input() content: IShowcase2v1;
  constructor() {}

  ngOnInit(): void {}
}
