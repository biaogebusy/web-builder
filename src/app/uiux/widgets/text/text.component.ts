import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IBtn } from '@core/interface/widgets/IBtn';
import type { IText } from '@core/interface/widgets/IText';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit {
  @Input() content: IText;
  constructor() {}

  ngOnInit(): void {}

  getBtnLink(content: any): IBtn {
    return {
      mode: 'raised',
      color: 'primary',
      ...content,
    };
  }
}
