import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel2v1',
  templateUrl: './carousel2v1.component.html',
  styleUrls: ['./carousel2v1.component.scss'],
})
export class Carousel2v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
