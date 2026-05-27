import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import type { IHero1v4 } from '@core/interface/combs/IHero';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero-1v4',
  templateUrl: './hero1v4.component.html',
  styleUrls: ['./hero1v4.component.scss'],
  imports: [TextComponent, DynamicComponentComponent],
})
export class Hero1v4Component {
  readonly content = input.required<IHero1v4>();
  constructor() {}
}
