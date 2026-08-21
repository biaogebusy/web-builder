import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  inject,
  viewChild,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_INPUT_VALUE_ACCESSOR, MatInputModule } from '@angular/material/input';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyFieldTextArea } from '@ngx-formly/material/textarea';
import { TranslateModule } from '@ngx-translate/core';
import { createPopper, type Instance as PopperInstance } from '@popperjs/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import { ScreenService } from '@core/service/screen.service';
import type { TiptapEditorComponent } from '@uiux/combs/other/tiptap-editor/tiptap-editor.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.scss'],
  providers: [{ provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: FormlyFieldTextArea }],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FormlyModule,
    BtnComponent,
    LoadingComponent,
    TranslateModule,
  ],
})
export class RichTextComponent extends FieldType<FieldTypeConfig> implements OnDestroy {
  readonly popup = viewChild<ElementRef>('popup');
  readonly editorHost = viewChild('editorHost', { read: ViewContainerRef });

  private readonly screenService = inject(ScreenService);
  private readonly hostElement = inject(ElementRef);
  private popper: PopperInstance | null = null;
  private editorRef: ComponentRef<TiptapEditorComponent> | null = null;
  // Bumped on every open and close, so an editor chunk that resolves after the popup
  // was closed (or the field destroyed) is discarded instead of mounted
  private openToken = 0;

  public value = '';
  public readonly editorLoaded = signal(false);
  public readonly editorLoading = signal(false);
  public readonly editorError = signal(false);

  async openRichText(): Promise<void> {
    const popup = this.popup()?.nativeElement;
    if (
      this.popper ||
      this.props.readonly ||
      this.formControl.disabled ||
      !popup ||
      !this.screenService.isPlatformBrowser()
    ) {
      return;
    }
    this.value = this.formControl.value ?? '';
    this.openToken++;
    this.editorError.set(false);
    this.popper = createPopper(this.hostElement.nativeElement, popup, {
      placement: 'left',
      strategy: 'fixed',
    });
    await this.loadEditor(this.openToken);
  }

  private async loadEditor(openToken: number): Promise<void> {
    if (this.editorLoading()) {
      return;
    }
    this.editorLoading.set(true);
    this.editorError.set(false);

    try {
      const { TiptapEditorComponent } = await import(
        '@uiux/combs/other/tiptap-editor/tiptap-editor.component'
      );
      const editorHost = this.editorHost();
      if (openToken !== this.openToken || !editorHost) {
        return;
      }
      const editorRef = editorHost.createComponent(TiptapEditorComponent);
      editorRef.setInput('content', { html: this.value, placeholder: this.props.placeholder });
      editorRef.setInput('editable', !this.formControl.disabled && !this.props.readonly);
      // The popup is opened by an explicit click, so move the caret into the editor
      editorRef.setInput('autofocus', true);
      editorRef.instance.htmlChange.subscribe(html => (this.value = html));
      const statusSubscription = this.formControl.statusChanges.subscribe(() => {
        editorRef.instance.setEditable(!this.formControl.disabled && !this.props.readonly);
      });
      editorRef.onDestroy(() => statusSubscription.unsubscribe());
      this.editorRef = editorRef;
      this.editorLoaded.set(true);
    } catch (error) {
      if (openToken === this.openToken) {
        console.error('Error loading Tiptap editor:', error);
        this.editorError.set(true);
      }
    } finally {
      if (openToken === this.openToken) {
        this.editorLoading.set(false);
      }
    }
  }

  retryEditor(): void {
    if (this.popper && !this.editorRef) {
      void this.loadEditor(this.openToken);
    }
  }

  onSave(): void {
    if (!this.editorLoaded()) {
      return;
    }
    if (this.formControl.disabled || this.props.readonly) {
      this.closePopup();
      return;
    }
    this.formControl.setValue(this.value);
    this.closePopup();
  }

  onCancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    this.openToken++;
    this.popper?.destroy();
    this.popper = null;
    this.editorRef?.destroy();
    this.editorRef = null;
    this.editorLoaded.set(false);
    this.editorLoading.set(false);
    this.editorError.set(false);
  }

  ngOnDestroy(): void {
    this.closePopup();
  }
}
