import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import type { ITitle } from '@core/interface/widgets/ITitle';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements AfterViewInit, OnDestroy {
  @Input() content: ITitle;
  @ViewChild('title', { static: false }) title: ElementRef;
  typed: any;
  screenService = inject(ScreenService);

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content?.typed?.enable) {
        import('typed.js').then(loader => {
          const { default: Typed } = loader;
          const typedEle = this.title.nativeElement.querySelectorAll('strong')[0];
          this.typed = new Typed(typedEle, {
            strings: this.content?.typed?.strings.map(item => item.label),
            ...this.content?.typed?.config,
          });
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}
