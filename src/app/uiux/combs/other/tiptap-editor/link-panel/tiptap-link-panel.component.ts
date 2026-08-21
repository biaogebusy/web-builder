import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Editor } from '@tiptap/core';
import { TOOLBAR_TOOLTIP_ABOVE } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

/**
 * Tiptap link editing panel (replaces window.prompt), shared by the tiptap-editor
 * comb and the bubble toolbar. The parent creates it on demand (mounted when
 * opened); on creation it carries the link at the cursor and selects the input.
 * After apply/remove it notifies the parent via closed to collapse; border and
 * placement are decided by the parent's styles.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-link-panel',
  templateUrl: './tiptap-link-panel.component.html',
  styleUrl: './tiptap-link-panel.component.scss',
  imports: [TranslateModule, MatTooltipModule, BtnComponent],
  providers: [TOOLBAR_TOOLTIP_ABOVE],
})
export class TiptapLinkPanelComponent {
  readonly editor = input.required<Editor>();
  readonly closed = output<void>();

  private readonly linkInput = viewChild<ElementRef<HTMLInputElement>>('linkInput');
  private cdr = inject(ChangeDetectorRef);
  private doc = inject(DOCUMENT);

  public linkUrl = signal('');

  constructor() {
    // When the editor is ready or the selection changes, bring in the link at the cursor and select the input for easy overwrite
    effect(() => {
      this.linkUrl.set(this.editor().getAttributes('link').href ?? '');
      queueMicrotask(() => this.linkInput()?.nativeElement.select());
    });
    // Tiptap events fire outside Angular; under zoneless we must manually schedule change detection to refresh button visibility
    effect(onCleanup => {
      const editor = this.editor();
      const refresh = (): void => this.cdr.markForCheck();
      editor.on('transaction', refresh);
      onCleanup(() => editor.off('transaction', refresh));
    });
  }

  /** Apply the link; an empty URL is treated as removal */
  apply(url: string): void {
    const href = url.trim();
    const chain = this.editor().chain().focus().extendMarkRange('link');
    if (href) {
      chain.setLink({ href }).run();
    } else {
      chain.unsetLink().run();
    }
    this.closed.emit();
  }

  remove(): void {
    this.editor().chain().focus().extendMarkRange('link').unsetLink().run();
    this.closed.emit();
  }

  open(): void {
    const href = this.editor().getAttributes('link').href;
    if (href) {
      this.doc.defaultView?.open(href, '_blank', 'noopener');
    }
  }

  close(): void {
    this.closed.emit();
  }
}
