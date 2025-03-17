import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import type { IInlineLightbox } from '@core/interface/widgets/IWidgets';

@Component({
    selector: 'app-inline-lightbox',
    templateUrl: './inline-lightbox.component.html',
    styleUrls: ['./inline-lightbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InlineLightboxComponent implements OnInit {
  @Input() content: IInlineLightbox;
  public settings = {
    counter: false,
  };

  ngOnInit(): void {}
}
