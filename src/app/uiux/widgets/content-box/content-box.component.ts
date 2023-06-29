import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IContentBox } from '@core/interface/widgets/IContentWidget';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBoxComponent implements OnInit {
  @Input() content: IContentBox;
  constructor() {}

  ngOnInit(): void {}
}
