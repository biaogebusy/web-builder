import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { BuilderState } from '@core/state/BuilderState';
import { generatePath } from '@core/util/dom-path.util';
@Directive({
   selector: '[contentedit]',
  host: {
    '[attr.data-path]': 'contentedit()',
    '(blur)': 'onBlur($event)',
    '(paste)': 'onPaste($event)',
    '(click)': 'onClick($event)',
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

  private componentItem: Element | null = null;
  // Original content at edit start, used to skip unchanged saves and avoid extra version snapshots
  private originalHtml: string | null = null;
  private el = inject(ElementRef);
  private builder = inject(BuilderState);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  // Race between directive destruction (re-render/route change) and an in-flight dynamic
  // import: never touch the injector after destruction
  private destroyed = false;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => (this.destroyed = true));
    this.componentItem = this.el.nativeElement.closest('.component-item');
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
    this.builder.updatePageContentByPath(path, currentTarget.innerHTML);
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

  onClick(event: MouseEvent): void {
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
      const clickCoords = { x: event.clientX, y: event.clientY };
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
