import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { UtilitiesService } from '@core/service/utilities.service';
import { IInlineLightbox } from '@uiux/widgets/IWidgets';

@Component({
  selector: 'app-inline-lightbox',
  templateUrl: './inline-lightbox.component.html',
  styleUrls: ['./inline-lightbox.component.scss'],
})
export class InlineLightboxComponent implements OnInit {
  @Input() content: IInlineLightbox;
  constructor(private lightbox: Lightbox, private util: UtilitiesService) {}

  ngOnInit(): void {}

  onClick(i: number): void {
    const src = this.content.elements[i].src;
    if (this.util.getFileType(src) === 'picture') {
      this.lightbox.open(this.content.elements, i);
    } else {
      window.open(src, '_blank');
    }
  }
}
