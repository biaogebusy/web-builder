import { NgOptimizedImage } from '@angular/common';
import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { IImg } from '@core/interface/widgets/IImg';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  imports: [
    NgOptimizedImage,
    ContenteditDirective,
    forwardRef(() => DynamicComponentComponent),
  ],
  host: {
    '[class]': 'content?.hostClasses',
  },
})
export class ImgComponent {
  @Input() content: IImg | undefined;
  @Input() isBg = false;
}
