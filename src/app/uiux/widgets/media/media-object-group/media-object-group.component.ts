import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IMediaObjectGroup } from '@core/interface/widgets/IMediaObject';

@Component({
  selector: 'app-media-object-group',
  templateUrl: './media-object-group.component.html',
  styleUrls: ['./media-object-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaObjectGroupComponent implements OnInit {
  @Input() content: IMediaObjectGroup;
  constructor() {}

  ngOnInit(): void {}
}
