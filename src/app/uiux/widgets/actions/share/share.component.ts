import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import type { IShare } from '@core/interface/widgets/IActions';
import type { ICoreConfig } from '@core/mobx/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/core.config';
import { DOCUMENT } from '@angular/common';
declare var window: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareComponent implements OnInit {
  @Input() content: IShare;
  config: any;
  url: string;

  constructor(
    private screenService: ScreenService,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.config = this.coreConfig.actions?.share;
      this.url = `${this.doc.location.origin}${this.content.params.url}`;
    }
  }

  open(): void {
    window.socialShare('.share-components');
  }
}
