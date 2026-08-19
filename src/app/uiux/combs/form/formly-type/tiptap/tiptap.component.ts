import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewContainerRef,
  inject,
  viewChild,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScreenService } from '@core/service/screen.service';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';

/**
 * Tiptap rich-text field. Tiptap is large, so the editor component is loaded
 * dynamically after explicit activation. Builder forms can opt into immediate
 * loading with props.autoLoad; the form value is the editor HTML and
 * props.toolbarContainer can project the toolbar into a full-width container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-field',
  template: `
    <ng-container #editorHost />
    @if (loading()) {
      <app-loading [content]="{ size: 32 }" />
    } @else if (loadError()) {
      <div class="tiptap-load-error" role="alert">
        <span>{{ 'BUILDER.FORM_EDITOR.LOAD_FAILED' | translate }}</span>
        <app-btn
          (btnClick)="retry()"
          [content]="{
            label: 'BUILDER.FORM_EDITOR.RETRY' | translate,
            mode: 'stroked',
            ariaLabel: 'BUILDER.FORM_EDITOR.RETRY' | translate,
          }"
        />
      </div>
    } @else if (!editorLoaded()) {
      <app-btn
        (btnClick)="activateEditor()"
        [content]="{
          label: 'BUILDER.FORM_EDITOR.ACTIVATE' | translate,
          icon: { svg: 'pencil' },
          mode: 'stroked',
          ariaLabel: 'BUILDER.FORM_EDITOR.ACTIVATE' | translate,
        }"
      />
    }
  `,
  imports: [BtnComponent, LoadingComponent, TranslateModule],
})
export class TiptapFieldType extends FieldType<FieldTypeConfig> implements AfterViewInit {
  private readonly editorHost = viewChild.required('editorHost', { read: ViewContainerRef });
  private screenService = inject(ScreenService);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private destroyed = false;
  readonly loading = signal(false);
  readonly loadError = signal(false);
  readonly editorLoaded = signal(false);
  private loadToken = 0;

  constructor() {
    super();
    this.destroyRef.onDestroy(() => (this.destroyed = true));
  }

  async ngAfterViewInit(): Promise<void> {
    // Public forms stay lightweight by default. Builder-owned forms explicitly
    // opt into eager editor loading through props.autoLoad.
    if (!this.screenService.isPlatformBrowser() || this.props['autoLoad'] !== true) {
      return;
    }
    await this.loadEditor();
  }

  async activateEditor(): Promise<void> {
    if (!this.destroyed && this.screenService.isPlatformBrowser()) {
      await this.loadEditor(true);
    }
  }

  retry(): void {
    if (!this.destroyed && this.screenService.isPlatformBrowser()) {
      void this.loadEditor(true);
    }
  }

  private async loadEditor(autofocus = false): Promise<void> {
    if (this.destroyed || this.loading() || this.editorLoaded()) {
      return;
    }
    const loadToken = ++this.loadToken;
    this.loading.set(true);
    this.loadError.set(false);

    try {
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
      editorRef.setInput('editable', this.isEditable());
      editorRef.setInput('autofocus', autofocus);
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
        .subscribe(() => editorRef.instance.setEditable(this.isEditable()));
      this.editorLoaded.set(true);
    } catch (error) {
      if (!this.destroyed && loadToken === this.loadToken) {
        console.error('Error loading Tiptap editor:', error);
        this.loadError.set(true);
      }
    } finally {
      if (!this.destroyed && loadToken === this.loadToken) {
        this.loading.set(false);
      }
    }
  }

  private isEditable(): boolean {
    return !this.formControl.disabled && !this.props.readonly;
  }
}
