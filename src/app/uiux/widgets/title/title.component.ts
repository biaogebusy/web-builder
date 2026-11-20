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
import { CONTENT_EDITOR } from '@core/token/content-editor.token';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ContenteditDirective, SafeHtmlPipe, TranslatePipe],
})
export class TitleComponent implements AfterViewInit, OnDestroy {
  readonly content = input<ITitle>();
  readonly title = viewChild<ElementRef>('title');
  private typed: any;
  private screenService = inject(ScreenService);
  private readonly editor = inject(CONTENT_EDITOR, { optional: true });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  protected canEditTitle(): boolean {
    return !!this.editor && !!this.element.nativeElement.closest('.component-item');
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      const content = this.content();
      const titleEl = this.title();
      if (content?.typed?.enable && titleEl) {
        import('typed.js').then(loader => {
          const { default: Typed } = loader;
          const typedEle = titleEl.nativeElement.querySelectorAll('strong')[0];
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
