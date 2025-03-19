import { Component, OnInit, Input } from '@angular/core';
import type { IBgImg } from '@core/interface/widgets/IBgImg';

@Component({
  selector: 'app-bg-img',
  templateUrl: './bg-img.component.html',
  styleUrls: ['./bg-img.component.scss'],
  standalone: false,
})
export class BgImgComponent implements OnInit {
  @Input() content: IBgImg;

  ngOnInit(): void {}

  get img(): any {
    const def = {
      classes: 'object-fit',
    };
    return Object.assign({}, def, this.content.img);
  }
}
