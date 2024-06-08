import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IMediaObject } from '@core/interface/widgets/IMediaObject';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html',
  styleUrls: ['./media-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaObjectComponent implements OnInit {
  @Input() content: IMediaObject;
  constructor() {}

  ngOnInit(): void {}
}
