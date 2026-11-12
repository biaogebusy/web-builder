import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  OnInit,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { CONTENT_EDITOR } from '@core/token/content-editor.token';
import { generatePath } from '@core/util/dom-path.util';
@Directive({
   selector: '[contentedit]',
  host: {
    '[attr.data-path]': 'contentedit()',
    '[attr.data-contentedit-placeholder]': 'showPlaceholder() ? contenteditPlaceholder() : null',
    '[attr.role]': 'showPlaceholder() ? "button" : null',
    '[attr.tabindex]': 'showPlaceholder() ? 0 : null',
    '[attr.aria-label]': 'showPlaceholder() ? contenteditPlaceholder() : null',
    '(blur)': 'onBlur($event)',
    '(paste)': 'onPaste($event)',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ContenteditDirective implements AfterViewInit, OnInit {
  readonly contentedit = input.required<string>();
  /**
   * Edit profile: 'plain' keeps a bare contenteditable (labels/short text);
   * 'rich' mounts tiptap in place (multi-paragraph bodies) with a bubble format toolbar;
   * 'inline' is single-line tiptap (headings): inline marks only, Enter commits, no paragraph wrapper
   */
  readonly contenteditProfile = input<'plain' | 'rich' | 'inline'>('plain');
  /** Optional empty-text label; kept outside the editable HTML. */
  readonly contenteditPlaceholder = input('');
  private readonly editing = signal(false);

  protected showPlaceholder(): boolean {
    return !!this.componentItem && !!this.contenteditPlaceholder() && !this.editing();
  }

  private componentItem: Element | null = null;
  // Original content at edit start, used to skip unchanged saves and avoid extra version snapshots
  private originalHtml: string | null = null;
  private el = inject(ElementRef);
  private editor = inject(CONTENT_EDITOR, { optional: true });
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  // Race between directive destruction (re-render/route change) and an in-flight dynamic
  // import: never touch the injector after destruction
  private destroyed = false;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => (this.destroyed = true));
    this.componentItem = this.editor ? this.el.nativeElement.closest('.component-item') : null;
  }

  onBlur(event: FocusEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!this.componentItem || !currentTarget || currentTarget.contentEditable !== 'true') {
      return;
    }
    currentTarget.contentEditable = 'false';
    const changed = currentTarget.innerHTML !== this.originalHtml;
    this.originalHtml = null;
    if (!changed) {
      return;
    }
    const path = generatePath(currentTarget);
    this.editor?.updatePageContentByPath(path, currentTarget.innerHTML);
  }

  /**
   *
   * @param event
   * Strip clipboard formatting
   */
  onPaste(event: ClipboardEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    // Do not intercept outside edit mode, so pasting on front-page content or nested
    // form controls is never hijacked
    if (!this.componentItem || currentTarget?.contentEditable !== 'true') {
      return;
    }
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const selection = window.getSelection();
    if (!clipboardData || !selection?.rangeCount) {
      return;
    }
    const plainText = clipboardData.getData('text/plain');

    const range = selection.getRangeAt(0);

    range.deleteContents();

    const textNode = document.createTextNode(plainText);
    range.insertNode(textNode);

    // Restore the selection so the caret stays at the right position
    range.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /** Activate an empty rich-text target without intercepting keys inside the editor. */
  onKeydown(event: KeyboardEvent): void {
    if (!this.showPlaceholder() || event.target !== event.currentTarget ||
        (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }
    this.onClick(event);
  }

  onClick(event: MouseEvent | KeyboardEvent): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!this.componentItem || !currentTarget) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    // Already in edit state: only move the caret, do not refresh the right panel again
    if (currentTarget.contentEditable === 'true') {
      return;
    }
    const path = generatePath(currentTarget);
    if (currentTarget.tagName === 'IMG') {
      // Only triggered inside the builder canvas; dynamically load the image inline editor
      // (selected state + floating action bar); the full form falls back to the drawer via
      // the action bar's "more settings"
      void import('@modules/builder/inline-editor/inline-image.service').then(
        ({ InlineImageService }) => {
          if (this.destroyed) {
            return;
          }
          // Pass the environment injector at the click site: the media library dialog
          // content (ManageMediaComponent) depends on route-level tokens like
          // BUILDER_CONFIG, which the root singleton service's own injector cannot resolve
          const envInjector = this.injector.get(EnvironmentInjector);
          this.injector
            .get(InlineImageService)
            .select(currentTarget as HTMLImageElement, path, envInjector);
        }
      );
    } else if (this.contenteditProfile() !== 'plain') {
      const profile = this.contenteditProfile() as 'rich' | 'inline';
      const clickCoords = event instanceof MouseEvent
        ? { x: event.clientX, y: event.clientY } : undefined;
      // Only triggered inside the builder canvas; dynamically load the tiptap inline editor
      // so public pages never pull it into the first bundle. Do not open the right text panel:
      // it injects a <p> wrapper into the element (see InlineEditComponent.initTextView),
      // which conflicts with the in-place editor; drawer.open() also steals focus and causes
      // false commits. Formatting is handled by the bubble toolbar
      void import('@modules/builder/inline-editor/inline-editor.service').then(
        ({ InlineEditorService }) => {
          if (this.destroyed) {
            return;
          }
          this.injector.get(InlineEditorService).activate({
            element: currentTarget,
            path,
            profile,
            clickCoords,
            onActivated: () => this.editing.set(true),
            onDeactivated: reason => {
              this.editing.set(false);
              if (reason === 'cancel' && !this.destroyed && this.showPlaceholder()) {
                afterNextRender(() => {
                  if (!this.destroyed && this.showPlaceholder() && currentTarget.isConnected) {
                    currentTarget.focus();
                  }
                }, { injector: this.injector });
              }
            },
          });
        }
      );
    } else {
      // Fallback profile: number-animate (JS animation owns the text node) and custom
      // templates etc. edit the text node in place and save on blur; the legacy text style
      // panel is retired and no longer opens with editing
      currentTarget.contentEditable = 'true';
      this.originalHtml = currentTarget.innerHTML;
    }
  }

  ngAfterViewInit(): void {
    const ele = this.el.nativeElement;
    if (this.componentItem) {
      ele.contentEditable = 'false';
    }
  }
}
