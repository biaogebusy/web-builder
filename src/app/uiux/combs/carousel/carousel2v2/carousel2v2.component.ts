import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel2v2',
  templateUrl: './carousel2v2.component.html',
  styleUrls: ['./carousel2v2.component.scss'],
})
export class Carousel2v2Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
