import { AfterViewInit, ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { getLibraryAsset } from '@core/config/library-assets';
import { ICoreConfig } from '@core/interface/IAppConfig';
import type { IInlineLightbox } from '@core/interface/widgets/IWidgets';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { LightgalleryModule } from 'lightgallery/angular';
import { LIGHTGALLERY_ASSETS } from './inline-lightbox.assets';

@Component({
  selector: 'app-inline-lightbox',
  templateUrl: './inline-lightbox.component.html',
  styleUrls: ['./inline-lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightgalleryModule, SafeHtmlPipe],
})
export class InlineLightboxComponent implements AfterViewInit {
  readonly content = input<IInlineLightbox>();
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public settings = {
    counter: false,
  };

  async ngAfterViewInit(): Promise<void> {
    const source = this.coreConfig.librariesUseLocal ? 'local' : 'cdn';
    await this.util.loadStyle(getLibraryAsset(LIGHTGALLERY_ASSETS, source, 'style'));
  }
}
