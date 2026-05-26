import { DatePipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type { IMediaMeta } from '@core/interface/widgets/IMediaMeta';
import { NgPipesModule } from 'ngx-pipes';
import { LinkComponent } from '../../link/link.component';

@Component({
  selector: 'app-media-meta',
  templateUrl: './media-meta.component.html',
  styleUrls: ['./media-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, MatButtonModule, NgPipesModule, LinkComponent],
})
export class MediaMetaComponent {
  readonly content = input<IMediaMeta>();
  constructor() {}

}
