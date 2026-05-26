import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import type { IContentBox } from '@core/interface/widgets/IContentWidget';
import { ImgComponent } from '../img/img.component';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ImgComponent, LinkComponent],
})
export class ContentBoxComponent {
  readonly content = input<IContentBox>();
  constructor() {}

}
