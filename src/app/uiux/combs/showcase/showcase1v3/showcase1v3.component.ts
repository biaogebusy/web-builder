import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IText } from '@core/interface/widgets/IText';

@Component({
  selector: 'app-showcase1v3',
  templateUrl: './showcase1v3.component.html',
  styleUrls: ['./showcase1v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase1v3Component implements OnInit {
  @Input() content: any;
  text: IText;

  constructor() {}

  ngOnInit(): void {
    this.text = {
      title: this.content.title,
      spacer: 'none',
    };
  }
}
