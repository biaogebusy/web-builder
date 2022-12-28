import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ITextHero } from '@core/interface/widgets/IText';

@Component({
  selector: 'app-hero-2v1',
  templateUrl: './hero2v1.component.html',
  styleUrls: ['./hero2v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero2v1Component implements OnInit {
  @Input() content: ITextHero;
  constructor() {}

  ngOnInit(): void {}
}
