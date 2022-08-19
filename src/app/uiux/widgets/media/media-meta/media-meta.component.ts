import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import type { IMediaMeta } from '../../../../core/interface/widgets/IMediaMeta';

@Component({
  selector: 'app-media-meta',
  templateUrl: './media-meta.component.html',
  styleUrls: ['./media-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaMetaComponent implements OnInit {
  @Input() content: IMediaMeta;
  showGtsm: boolean;
  showLtmd: boolean;
  constructor(
    private screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.screen.mqAlias$().subscribe((mq) => {
        this.showGtsm = mq.includes('gt-sm');
        this.showLtmd = mq.includes('lt-md');
        this.cd.detectChanges();
      });
    }
  }
}
