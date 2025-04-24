import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import type { IShare } from '@core/interface/widgets/IActions';
import type { ICoreConfig, ICoreShare } from '@core/interface/IAppConfig';
import { ScreenService } from '@core/service/screen.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { DOCUMENT } from '@angular/common';
import { UtilitiesService } from '@core/service/utilities.service';
declare let window: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ShareComponent implements OnInit {
  private screenService = inject(ScreenService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private doc = inject<Document>(DOCUMENT);
  private util = inject(UtilitiesService);
  private cd = inject(ChangeDetectorRef);

  @Input() content: IShare;
  public config: ICoreShare;
  public url: string;

  async ngOnInit(): Promise<void> {
    if (this.screenService.isPlatformBrowser()) {
      await this.util.loadStyle('/assets/styles/share/share.min.css');
      this.config = this.coreConfig.actions?.share;
      this.url = `${this.doc.location.origin}${this.content.params.url}`;
      this.cd.detectChanges();
    }
  }

  open(): void {
    window.socialShare('.share-components');
  }
}
