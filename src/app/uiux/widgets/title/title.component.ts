import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ITitle } from '@core/interface/widgets/ITitle';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
  @Input() content: ITitle;
  constructor() {}

  ngOnInit(): void {}
}
