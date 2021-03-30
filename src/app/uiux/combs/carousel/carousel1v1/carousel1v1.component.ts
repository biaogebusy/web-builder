import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel1v1',
  templateUrl: './carousel1v1.component.html',
  styleUrls: ['./carousel1v1.component.scss'],
})
export class Carousel1v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
