import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';

@Component({
  selector: 'app-media-meta',
  templateUrl: './media-meta.component.html',
  styleUrls: ['./media-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaMetaComponent implements OnInit {
  @Input() content: any;
  constructor(public screen: ScreenState) {}

  ngOnInit(): void {}
}
