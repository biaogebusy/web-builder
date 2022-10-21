import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IHero1v1 } from '@core/interface/combs/IHero';

@Component({
  selector: 'app-hero1v1',
  templateUrl: './hero1v1.component.html',
  styleUrls: ['./hero1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero1v1Component implements OnInit {
  @Input() content: IHero1v1;
  constructor() {}

  ngOnInit(): void {}
}
