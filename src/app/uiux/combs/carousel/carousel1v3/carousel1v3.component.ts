import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel1v3',
  templateUrl: './carousel1v3.component.html',
  styleUrls: ['./carousel1v3.component.scss'],
})
export class Carousel1v3Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
