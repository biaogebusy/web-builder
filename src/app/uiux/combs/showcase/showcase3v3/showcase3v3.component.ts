import { DatePipe, SlicePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { IShowcase3v3 } from '@core/interface/combs/IShowcase';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { FeatureBoxComponent } from '@uiux/widgets/feature-box/feature-box.component';
import { LinkComponent } from '@uiux/widgets/link/link.component';
import { NgPipesModule } from 'ngx-pipes';

@Component({
  selector: 'app-showcase-3v3',
  templateUrl: './showcase3v3.component.html',
  styleUrls: ['./showcase3v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    SlicePipe,
    MatIconModule,
    NgPipesModule,
    BtnComponent,
    FeatureBoxComponent,
    LinkComponent,
  ],
})
export class Showcase3v3Component implements AfterViewInit {
  private cd = inject(ChangeDetectorRef);

  @Input() content: IShowcase3v3;
  isShow: boolean;


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
