import { Component, Input, OnInit } from '@angular/core';
import type { ITextHero } from '@core/interface/widgets/IText';

@Component({
    selector: 'app-text-hero',
    templateUrl: './text-hero.component.html',
    styleUrls: ['./text-hero.component.scss'],
    standalone: false
})
export class TextHeroComponent implements OnInit {
  @Input() content: ITextHero;

  ngOnInit(): void {}
}
