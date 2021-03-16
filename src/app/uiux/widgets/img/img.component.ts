import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  @Input() content: any;
  @HostBinding('class') hostClasses: any;
  constructor() {}

  ngOnInit(): void {
    this.hostClasses = this.content.hostClasses;
  }
}
