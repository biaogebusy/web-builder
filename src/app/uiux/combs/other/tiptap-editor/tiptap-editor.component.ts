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
import {
  buildRichExtensions,
  alignIcon as resolveAlignIcon,
} from './tiptap-extensions';

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
  /** External toolbar container selector: when set, the toolbar is projected into that container (e.g. a full-width bar above the edit area), otherwise rendered inside the editor box */
  readonly toolbarContainer = input<string>();
  /** Initial editable state (passed along from the form control's disabled state); runtime changes go through setEditable() */
  readonly editable = input<boolean>(true);
  /** Optional fixed editor height for compact form and comment contexts. */
  readonly height = input<string>();
  /** Place the caret in the editor on creation; used when the editor is mounted by an explicit user click */
  readonly autofocus = input(false);
  readonly htmlChange = output<string>();

  private readonly editorElement = viewChild.required<ElementRef<HTMLDivElement>>('tiptapEditor');
  /** Host element of the shared bubble component, handed to the BubbleMenu extension for positioning */
  private readonly bubbleMenu = viewChild.required('bubbleMenu', { read: ElementRef });
  private readonly toolbarTpl = viewChild.required<TemplateRef<unknown>>('toolbarTpl');

  private screenService = inject(ScreenService);
  private nodeService = inject(NodeService);
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);
  private doc = inject(DOCUMENT);

  public editor = signal<Editor | null>(null);
  /** Toolbar has been projected into the external container; the box no longer renders a duplicate */
  public toolbarDetached = signal(false);
  /** Link editing panel (shared child component): on open it carries the link address at the cursor */
  public linkPanelOpen = signal(false);
  private toolbarOutlet: DomPortalOutlet | null = null;

  ngAfterViewInit(): void {
    // Tiptap depends on a real DOM; skip initialization under SSR
    if (this.screenService.isPlatformBrowser()) {
      this.initEditor();
      this.attachToolbar();
    }
  }

  private initEditor(): void {
    const editor = new Editor({
      element: this.editorElement().nativeElement,
      editable: this.editable(),
      autofocus: this.autofocus() ? 'end' : false,
      // Same extension recipe as the canvas inline-edit 'rich' profile, so the form and canvas behave identically
      extensions: buildRichExtensions({
        bubbleElement: this.bubbleMenu().nativeElement,
        appendTo: () => this.doc.body,
        placeholder:
          this.content()?.placeholder ?? this.translate.instant('BUILDER.FORM_EDITOR.PLACEHOLDER'),
      }),
      content: this.content()?.html ?? '',
      onUpdate: ({ editor }) => {
        // getHTML() still returns '<p></p>' after clearing; consumers such as required validation treat it as empty
        this.htmlChange.emit(editor.isEmpty ? '' : editor.getHTML());
      },
      // Tiptap events fire outside Angular; under zoneless we must manually schedule change detection to refresh the toolbar active state
      onTransaction: () => {
        this.cdr.markForCheck();
      },
      editorProps: {
        attributes: {
          // Focus indication is left to the .editor-container:focus-within themed outline, no hardcoded ring
          class: 'p-4 min-h-[200px] focus:outline-none',
        },
      },
    });
    this.editor.set(editor);
  }

  /** Project the toolbar into an external container via portal; the view still belongs to this component (styles, change detection unaffected) */
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

  /** External value write (form reset/backfill): skip when identical to current content to avoid interrupting input and the cursor */
  setContent(html: string): void {
    const editor = this.editor();
    if (!editor || html === editor.getHTML() || (!html && editor.isEmpty)) {
      return;
    }
    editor.commands.setContent(html || '', { emitUpdate: false });
  }

  /** Sync the form control's disabled state to the editor; emitUpdate=false, toggling editability emits no content-update event */
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

  /** The align trigger button icon follows the current alignment */
  alignIcon(): string {
    const editor = this.editor();
    return editor ? resolveAlignIcon(editor) : 'format-align-left';
  }

  ngOnDestroy(): void {
    // Only reclaim the projected view: dispose() would also remove the external container element, which is not owned by this component
    this.toolbarOutlet?.detach();
    this.editor()?.destroy();
  }
}
