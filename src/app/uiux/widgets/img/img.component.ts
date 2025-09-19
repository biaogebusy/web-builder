import { Component, HostBinding, Input, OnInit } from '@angular/core';
import type { IImg } from '@core/interface/widgets/IImg';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  standalone: false,
})
export class ImgComponent implements OnInit {
  @Input() content: IImg | undefined;
  @Input() isBg = false;
  @HostBinding('class') hostClasses: any;

  ngOnInit(): void {
    if (this.content?.hostClasses) {
      this.hostClasses = this.content.hostClasses;
    }
  }
}
