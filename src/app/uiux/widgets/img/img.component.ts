import { Component, Input } from '@angular/core';
import type { IImg } from '@core/interface/widgets/IImg';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  standalone: false,
  host: {
    '[class]': 'content?.hostClasses',
  },
})
export class ImgComponent {
  @Input() content: IImg | undefined;
  @Input() isBg = false;
}
