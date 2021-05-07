import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ScreenState } from '../../../mobx/screen/ScreenState';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  @Input() content: any;
  @HostBinding('class') hostClasses: any;
  constructor(public screen: ScreenState) {}

  ngOnInit(): void {
    if (this.content.hostClasses) {
      this.hostClasses = this.content.hostClasses;
    }
  }
}
