import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import type { IShowcase3v3 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-3v3',
  templateUrl: './showcase3v3.component.html',
  styleUrls: ['./showcase3v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v3Component implements OnInit, AfterViewInit {
  private cd = inject(ChangeDetectorRef);

  @Input() content: IShowcase3v3;
  isShow: boolean;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.showImage();
  }

  showImage(): void {
    if (this.content?.showImage) {
      this.isShow = true;
      this.cd.detectChanges();
      return;
    }
    if (this.content?.showImage === undefined && this.content.feature) {
      this.isShow = true;
      this.cd.detectChanges();
      return;
    }

    this.isShow = false;
    this.cd.detectChanges();
  }
}
