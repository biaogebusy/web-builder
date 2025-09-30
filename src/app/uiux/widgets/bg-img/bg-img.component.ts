import { Component, OnInit, Input, signal } from '@angular/core';
import type { IBgImg } from '@core/interface/widgets/IBgImg';
import { IImg } from '@core/interface/widgets/IImg';

@Component({
  selector: 'app-bg-img',
  templateUrl: './bg-img.component.html',
  styleUrls: ['./bg-img.component.scss'],
  standalone: false,
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
