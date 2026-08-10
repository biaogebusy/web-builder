import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Editor } from '@tiptap/core';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { TOOLBAR_TOOLTIP_ABOVE, ToolbarKeynavDirective } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { TiptapBubbleMenuComponent } from './bubble-menu/tiptap-bubble-menu.component';
import { TiptapLinkPanelComponent } from './link-panel/tiptap-link-panel.component';
import { buildRichExtensions, alignIcon as resolveAlignIcon } from './tiptap-extensions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-editor',
  templateUrl: './tiptap-editor.component.html',
  styleUrl: './tiptap-editor.component.scss',
  imports: [
    NgTemplateOutlet,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule,
    TranslateModule,
    BtnComponent,
    IconComponent,
    TiptapBubbleMenuComponent,
    TiptapLinkPanelComponent,
    ToolbarKeynavDirective,
  ],
  providers: [TOOLBAR_TOOLTIP_ABOVE],
})
export class TiptapEditorComponent implements AfterViewInit, OnDestroy {
  readonly content = input<{ html?: string; placeholder?: string }>();
  /** 外部工具栏容器选择器:传入时工具栏投影到该容器(如编辑区上方的通栏),否则在编辑器盒子内渲染 */
  readonly toolbarContainer = input<string>();
  /** 初始可编辑状态(随表单控件禁用态传入);运行期变更走 setEditable() */
  readonly editable = input<boolean>(true);
  readonly htmlChange = output<string>();

  private readonly editorElement = viewChild.required<ElementRef<HTMLDivElement>>('tiptapEditor');
  /** 共享气泡组件的宿主元素,交给 BubbleMenu 扩展定位 */
  private readonly bubbleMenu = viewChild.required('bubbleMenu', { read: ElementRef });
  private readonly toolbarTpl = viewChild.required<TemplateRef<unknown>>('toolbarTpl');

  private screenService = inject(ScreenService);
  private nodeService = inject(NodeService);
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);
  private doc = inject(DOCUMENT);

  public editor = signal<Editor | null>(null);
  /** 工具栏已投影到外部容器,盒子内不再重复渲染 */
  public toolbarDetached = signal(false);
  /** 链接编辑面板(共享子组件):打开时带入光标处链接地址 */
  public linkPanelOpen = signal(false);
  private toolbarOutlet: DomPortalOutlet | null = null;

  ngAfterViewInit(): void {
    // tiptap 依赖真实 DOM，SSR 环境下跳过初始化
    if (this.screenService.isPlatformBrowser()) {
      this.initEditor();
      this.attachToolbar();
    }
  }

  private initEditor(): void {
    const editor = new Editor({
      element: this.editorElement().nativeElement,
      editable: this.editable(),
      // 与画布内联编辑 rich 档同一扩展配方,保证表单与画布两处行为一致
      extensions: buildRichExtensions({
        bubbleElement: this.bubbleMenu().nativeElement,
        appendTo: () => this.doc.body,
        placeholder:
          this.content()?.placeholder ?? this.translate.instant('BUILDER.FORM_EDITOR.PLACEHOLDER'),
      }),
      content: this.content()?.html ?? '',
      onUpdate: ({ editor }) => {
        // 清空后 getHTML() 仍是 '<p></p>',对表单必填校验等消费方按空值处理
        this.htmlChange.emit(editor.isEmpty ? '' : editor.getHTML());
      },
      // tiptap 事件在 Angular 之外触发，zoneless 下需手动调度变更检测以刷新工具栏激活态
      onTransaction: () => {
        this.cdr.markForCheck();
      },
      editorProps: {
        attributes: {
          // 焦点提示交给 .editor-container:focus-within 的主题色描边,不用硬编码 ring
          class: 'p-4 min-h-[200px] focus:outline-none',
        },
      },
    });
    this.editor.set(editor);
  }

  /** 工具栏以 portal 投影到外部容器,视图仍归本组件所有(样式、变更检测不受影响) */
  private attachToolbar(): void {
    const selector = this.toolbarContainer();
    const target = selector ? this.doc.querySelector(selector) : null;
    if (!target) {
      return;
    }
    this.toolbarOutlet = new DomPortalOutlet(target);
    this.toolbarOutlet.attach(new TemplatePortal(this.toolbarTpl(), this.viewContainerRef));
    this.toolbarDetached.set(true);
  }

  /** 外部值写入(表单 reset/回填):与当前内容一致时跳过,避免打断输入与光标 */
  setContent(html: string): void {
    const editor = this.editor();
    if (!editor || html === editor.getHTML() || (!html && editor.isEmpty)) {
      return;
    }
    editor.commands.setContent(html || '', { emitUpdate: false });
  }

  /** 表单控件禁用态同步到编辑器;emitUpdate=false,切换编辑态不产生内容更新事件 */
  setEditable(editable: boolean): void {
    this.editor()?.setEditable(editable, false);
    this.cdr.markForCheck();
  }

  openLinkPanel(): void {
    this.linkPanelOpen.set(true);
  }

  closeLinkPanel(): void {
    this.linkPanelOpen.set(false);
    this.editor()?.commands.focus();
  }

  addImage(): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    this.nodeService.pickAndUploadImage(url => {
      editor.chain().focus().setImage({ src: url }).run();
    });
  }

  /** 对齐触发钮图标跟随当前对齐方式 */
  alignIcon(): string {
    const editor = this.editor();
    return editor ? resolveAlignIcon(editor) : 'format-align-left';
  }

  ngOnDestroy(): void {
    // 只回收投影出去的视图:dispose() 会连带移除外部容器元素,而容器不归本组件所有
    this.toolbarOutlet?.detach();
    this.editor()?.destroy();
  }
}
