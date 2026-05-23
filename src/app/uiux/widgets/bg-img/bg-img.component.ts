import { Component, OnInit, Input, forwardRef, signal } from '@angular/core';
import type { IBgImg } from '@core/interface/widgets/IBgImg';
import { IImg } from '@core/interface/widgets/IImg';
import { BgComponent } from '../bg/bg.component';
import { ImgComponent } from '../img/img.component';

@Component({
  selector: 'app-bg-img',
  templateUrl: './bg-img.component.html',
  styleUrls: ['./bg-img.component.scss'],
  imports: [BgComponent, forwardRef(() => ImgComponent)],
})
export class BgImgComponent implements OnInit {
  @Input() content: IBgImg;
  public img = signal<IImg>({
    classes: '',
    src: '',
  });
  ngOnInit(): void {
    this.img.set(
      Object.assign(
        {
          classes: 'bg-cover',
        },
        this.content.img
      )
    );
  }
}
