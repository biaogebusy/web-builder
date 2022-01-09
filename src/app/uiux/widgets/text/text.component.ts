import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IText } from '@core/interface/widgets/IText';

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
}
