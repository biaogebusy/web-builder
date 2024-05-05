import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IMediaMeta } from '@core/interface/widgets/IMediaMeta';

@Component({
  selector: 'app-media-meta',
  templateUrl: './media-meta.component.html',
  styleUrls: ['./media-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaMetaComponent implements OnInit {
  @Input() content: IMediaMeta;
  constructor() {}

  ngOnInit(): void {}
}
