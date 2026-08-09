import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  ElementRef,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  afterNextRender,
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
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Editor, Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { TextAlign } from '@tiptap/extension-text-align';
import { NodeService } from '@core/service/node.service';
import { ScreenService } from '@core/service/screen.service';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { TiptapBubbleMenuComponent } from './bubble-menu/tiptap-bubble-menu.component';

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
  ],
  providers: [
    // 工具栏提示统一显示在按钮上方,避免遮住正下方的编辑内容
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: { showDelay: 0, hideDelay: 0, touchendHideDelay: 1500, position: 'above' },
    },
  ],
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
  private readonly linkInput = viewChild<ElementRef<HTMLInputElement>>('linkInput');

  private screenService = inject(ScreenService);
  private nodeService = inject(NodeService);
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);
  private injector = inject(Injector);
  private doc = inject(DOCUMENT);

  public editor = signal<Editor | null>(null);
  /** 工具栏已投影到外部容器,盒子内不再重复渲染 */
  public toolbarDetached = signal(false);
  /** 链接编辑面板(替代 window.prompt):打开时带入光标处链接地址 */
  public linkPanelOpen = signal(false);
  public linkUrl = signal('');
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
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
          // 编辑态点击链接不跳转,避免误触离开;打开动作在链接面板里
          // 链接颜色由 .ProseMirror a 样式接管,不注入 class 以免写进存储的 HTML
          link: {
            openOnClick: false,
          },
        }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Highlight,
        // 选区级文字样式(字色/背景/字号),补齐 Quill 迁移时缺失的颜色能力
        TextStyleKit,
        Image,
        Placeholder.configure({
          placeholder:
            this.content()?.placeholder ??
            this.translate.instant('BUILDER.FORM_EDITOR.PLACEHOLDER'),
        }),
        BubbleMenu.configure({
          element: this.bubbleMenu().nativeElement,
          // 挂到 body:插件默认 append 到编辑器父元素,会被 .editor-container 的
          // overflow:hidden 裁剪
          appendTo: () => this.doc.body,
        }),
      ] as Extensions,
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
    const editor = this.editor();
    if (!editor) {
      return;
    }
    this.linkUrl.set(editor.getAttributes('link').href ?? '');
    this.linkPanelOpen.set(true);
    afterNextRender(() => this.linkInput()?.nativeElement.select(), { injector: this.injector });
  }

  closeLinkPanel(): void {
    this.linkPanelOpen.set(false);
    this.editor()?.commands.focus();
  }

  /** 应用链接;空 URL 视为移除 */
  applyLink(url: string): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    const href = url.trim();
    const chain = editor.chain().focus().extendMarkRange('link');
    if (href) {
      chain.setLink({ href }).run();
    } else {
      chain.unsetLink().run();
    }
    this.linkPanelOpen.set(false);
  }

  removeLink(): void {
    this.editor()?.chain().focus().extendMarkRange('link').unsetLink().run();
    this.linkPanelOpen.set(false);
  }

  openLink(): void {
    const href = this.editor()?.getAttributes('link').href;
    if (href) {
      this.doc.defaultView?.open(href, '_blank', 'noopener');
    }
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
    const active = ['center', 'right', 'justify'].find(align =>
      editor?.isActive({ textAlign: align })
    );
    return `format-align-${active ?? 'left'}`;
  }

  /** WAI-ARIA toolbar 惯例:左右方向键在工具栏按钮间移动焦点 */
  onToolbarKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }
    const buttons = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])'
      )
    );
    const current = (event.target as HTMLElement).closest('button');
    const index = current ? buttons.indexOf(current as HTMLButtonElement) : -1;
    if (index < 0) {
      return;
    }
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    buttons[(index + step + buttons.length) % buttons.length].focus();
  }

  ngOnDestroy(): void {
    // 只回收投影出去的视图:dispose() 会连带移除外部容器元素,而容器不归本组件所有
    this.toolbarOutlet?.detach();
    this.editor()?.destroy();
  }
}
