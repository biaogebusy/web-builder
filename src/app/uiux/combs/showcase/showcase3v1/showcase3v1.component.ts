import { IText } from '@core/interface/widgets/IText';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IShowcase3v1 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase3v1',
  templateUrl: './showcase3v1.component.html',
  styleUrls: ['./showcase3v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v1Component implements OnInit {
  @Input() content: IShowcase3v1;
  text: IText;
  constructor() {}

  ngOnInit(): void {
    this.text = {
      title: this.content.title,
      spacer: 'none',
      body: this.content.content,
      classes: 'text-center',
    };
  }
}
