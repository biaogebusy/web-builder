import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bg-img',
  templateUrl: './bg-img.component.html',
  styleUrls: ['./bg-img.component.scss'],
})
export class BgImgComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
