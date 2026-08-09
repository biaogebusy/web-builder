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
 * tiptap 富文本字段。tiptap 体积较大,编辑器组件按需动态载入(与 CMS 动态组件共用同一 chunk),
 * 表单值即编辑器 HTML;props.toolbarContainer 可把工具栏投影到页面上已有的通栏容器。
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
    // tiptap 依赖真实 DOM,SSR 环境下不创建编辑器
    if (!this.screenService.isPlatformBrowser()) {
      return;
    }
    const { TiptapEditorComponent } = await import(
      '@uiux/combs/other/tiptap-editor/tiptap-editor.component'
    );
    // 切换内容类型会在 chunk 加载期间销毁本字段,此时不能再往已销毁的容器里插组件
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
    // output 的订阅随编辑器组件(挂在本字段视图上)一起销毁,无需手动退订
    editorRef.instance.htmlChange.subscribe((html: string) => this.formControl.setValue(html));
    // 表单侧变更(reset/回填)同步到编辑器,否则所见内容与提交值不一致;
    // setContent 对相同内容会跳过,不会打断正在输入的光标
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => editorRef.instance.setContent(value ?? ''));
    this.formControl.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => editorRef.instance.setEditable(!this.formControl.disabled));
  }
}
