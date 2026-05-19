import { Component, Input } from '@angular/core';
import type { ITextHero } from '@core/interface/widgets/IText';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-text-hero',
  templateUrl: './text-hero.component.html',
  styleUrls: ['./text-hero.component.scss'],
  imports: [DynamicComponentComponent],
})
export class TextHeroComponent {
  @Input() content: ITextHero;

}
