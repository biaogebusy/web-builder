import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ITextHero } from '@core/interface/widgets/IText';
import { ScreenState } from '@core/mobx/screen/ScreenState';

@Component({
  selector: 'app-hero2v1',
  templateUrl: './hero2v1.component.html',
  styleUrls: ['./hero2v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero2v1Component implements OnInit {
  @Input() content: ITextHero;
  constructor() {}

  ngOnInit(): void {}
}
