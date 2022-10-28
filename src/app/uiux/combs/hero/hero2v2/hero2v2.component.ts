import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IHero2v2 } from '@core/interface/combs/IHero';

@Component({
  selector: 'app-hero2v2',
  templateUrl: './hero2v2.component.html',
  styleUrls: ['./hero2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero2v2Component implements OnInit {
  @Input() content: IHero2v2;
  constructor() {}

  ngOnInit(): void {}
}
