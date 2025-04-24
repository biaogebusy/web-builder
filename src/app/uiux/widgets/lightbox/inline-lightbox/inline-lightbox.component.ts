import { AfterViewInit, ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import type { IInlineLightbox } from '@core/interface/widgets/IWidgets';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-inline-lightbox',
  templateUrl: './inline-lightbox.component.html',
  styleUrls: ['./inline-lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InlineLightboxComponent implements AfterViewInit {
  @Input() content: IInlineLightbox;
  private util = inject(UtilitiesService);
  public settings = {
    counter: false,
  };

  async ngAfterViewInit(): Promise<void> {
    await this.util.loadStyle('/assets/styles/lightgallery/css/lightgallery-bundle.min.css');
  }
}
