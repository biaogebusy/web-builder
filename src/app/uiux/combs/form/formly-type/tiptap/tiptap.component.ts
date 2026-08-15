import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewContainerRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenService } from '@core/service/screen.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Tiptap rich-text field. Tiptap is large, so the editor component is loaded
 * dynamically on demand (shares the same chunk as the CMS dynamic components);
 * the form value is the editor HTML; props.toolbarContainer can project the
 * toolbar into an existing full-width container on the page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-field',
  template: '<ng-container #editorHost />',
})
export class TiptapFieldType extends FieldType<FieldTypeConfig> implements AfterViewInit {
  private readonly editorHost = viewChild.required('editorHost', { read: ViewContainerRef });
  private screenService = inject(ScreenService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private destroyed = false;

  constructor() {
    super();
    this.destroyRef.onDestroy(() => (this.destroyed = true));
  }

  async ngAfterViewInit(): Promise<void> {
    // Tiptap depends on a real DOM; do not create the editor in SSR
    if (!this.screenService.isPlatformBrowser()) {
      return;
    }
    const { TiptapEditorComponent } = await import(
      '@uiux/combs/other/tiptap-editor/tiptap-editor.component'
    );
    // Switching content type destroys this field while the chunk loads; must not
    // insert a component into an already-destroyed container
    if (this.destroyed) {
      return;
    }
    const editorRef = this.editorHost().createComponent(TiptapEditorComponent);
    editorRef.setInput('content', {
      html: this.formControl.value ?? '',
      placeholder:
        this.props.placeholder || this.translate.instant('BUILDER.FORM_EDITOR.PLACEHOLDER'),
    });
    editorRef.setInput('toolbarContainer', this.props['toolbarContainer']);
    editorRef.setInput('editable', !this.formControl.disabled);
    // The output subscription is destroyed together with the editor component
    // (mounted on this field's view), so no manual unsubscribe is needed
    editorRef.instance.htmlChange.subscribe((html: string) => this.formControl.setValue(html));
    // Form-side changes (reset/backfill) sync to the editor, otherwise what is
    // shown differs from the submitted value; setContent skips identical content,
    // so it does not interrupt the cursor while typing
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => editorRef.instance.setContent(value ?? ''));
    this.formControl.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => editorRef.instance.setEditable(!this.formControl.disabled));
  }
}
