import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IBgImg } from '@core/interface/widgets/IBgImg';

@Component({
  selector: 'app-bg-img',
  templateUrl: './bg-img.component.html',
  styleUrls: ['./bg-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgImgComponent implements OnInit {
  @Input() content: IBgImg;
  constructor() {}

  ngOnInit(): void {}

  get img(): any {
    const def = {
      classes: 'object-fit',
    };
    return Object.assign({}, def, this.content.img);
  }
}
