import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  viewChild
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ITitle } from '@core/interface/widgets/ITitle';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ContenteditDirective, SafeHtmlPipe],
})
export class TitleComponent implements AfterViewInit, OnDestroy {
  readonly content = input<ITitle>();
  readonly title = viewChild<ElementRef>('title');
  private typed: any;
  private screenService = inject(ScreenService);

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.content()?.typed?.enable) {
        import('typed.js').then(loader => {
          const { default: Typed } = loader;
          const typedEle = this.title().nativeElement.querySelectorAll('strong')[0];
          const content = this.content();
          this.typed = new Typed(typedEle, {
            strings: content?.typed?.strings.map(item => item.label),
            ...content?.typed?.config,
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
