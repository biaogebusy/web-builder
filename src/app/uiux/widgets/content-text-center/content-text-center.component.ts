import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IContentTextCenter } from '@core/interface/widgets/IContentWidget';

@Component({
  selector: 'app-content-text-center',
  templateUrl: './content-text-center.component.html',
  styleUrls: ['./content-text-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentTextCenterComponent implements OnInit {
  @Input() content: IContentTextCenter;
  constructor() {}

  ngOnInit(): void {}
}
