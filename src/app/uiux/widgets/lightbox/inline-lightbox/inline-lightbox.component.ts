import { Component, Input, OnInit } from '@angular/core';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-inline-lightbox',
  templateUrl: './inline-lightbox.component.html',
  styleUrls: ['./inline-lightbox.component.scss'],
})
export class InlineLightboxComponent implements OnInit {
  @Input() content: any;
  constructor(
    private lightbox: Lightbox,
    private lightboxConfig: LightboxConfig
  ) {}

  ngOnInit(): void {}

  onClick(i: number): void {
    this.lightbox.open(this.content.elements, i);
  }
}
