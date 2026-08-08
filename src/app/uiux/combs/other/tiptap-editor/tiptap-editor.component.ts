import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { Editor, Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { TextAlign } from '@tiptap/extension-text-align';
import { ScreenService } from '@core/service/screen.service';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-editor',
  templateUrl: './tiptap-editor.component.html',
  styleUrl: './tiptap-editor.component.scss',
  imports: [MatDividerModule, MatMenuModule, BtnComponent, IconComponent],
})
export class TiptapEditorComponent implements AfterViewInit, OnDestroy {
  readonly content = input<any>();
  readonly htmlChange = output<string>();

  private readonly editorElement = viewChild.required<ElementRef<HTMLDivElement>>('tiptapEditor');
  private readonly bubbleMenu = viewChild.required<ElementRef<HTMLDivElement>>('bubbleMenu');

  private screenService = inject(ScreenService);
  private cdr = inject(ChangeDetectorRef);

  public editor = signal<Editor | null>(null);

  ngAfterViewInit(): void {
    // tiptap 依赖真实 DOM，SSR 环境下跳过初始化
    if (this.screenService.isPlatformBrowser()) {
      this.initEditor();
    }
  }

  private initEditor(): void {
    const editor = new Editor({
      element: this.editorElement().nativeElement,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4, 5, 6],
          },
          link: {
            openOnClick: true,
            HTMLAttributes: {
              class: 'text-blue-500 underline hover:text-blue-700',
            },
          },
        }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Highlight,
        Image,
        Placeholder.configure({
          placeholder: '输入内容...',
        }),
        BubbleMenu.configure({
          element: this.bubbleMenu().nativeElement,
        }),
      ] as Extensions,
      content: this.content()?.html ?? '',
      onUpdate: ({ editor }) => {
        this.htmlChange.emit(editor.getHTML());
      },
      // tiptap 事件在 Angular 之外触发，zoneless 下需手动调度变更检测以刷新工具栏激活态
      onTransaction: () => {
        this.cdr.markForCheck();
      },
      editorProps: {
        attributes: {
          class: 'p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500',
        },
      },
    });
    this.editor.set(editor);
  }

  addLink(): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  addImage(): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  ngOnDestroy(): void {
    this.editor()?.destroy();
  }
}
