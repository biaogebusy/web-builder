import { AfterViewInit, ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ICoreConfig } from '@core/interface/IAppConfig';
import type { IInlineLightbox } from '@core/interface/widgets/IWidgets';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-inline-lightbox',
  templateUrl: './inline-lightbox.component.html',
  styleUrls: ['./inline-lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LightgalleryModule, SafeHtmlPipe],
})
export class InlineLightboxComponent implements AfterViewInit {
  @Input() content: IInlineLightbox;
  private util = inject(UtilitiesService);
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  public settings = {
    counter: false,
  };

  async ngAfterViewInit(): Promise<void> {
    if (this.coreConfig.librariesUseLocal) {
      await this.util.loadStyle('/assets/injects/lightgallery/css/lightgallery-bundle.min.css');
    } else {
      const lightgalleryStyle = this.util.getLibraries('lightgallery', 'cdn', 'style');
      await this.util.loadStyle(lightgalleryStyle);
    }
  }
}
