import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Editor } from '@tiptap/core';
import { TOOLBAR_TOOLTIP_ABOVE, ToolbarKeynavDirective } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { TiptapImagePanelComponent } from '../image-panel/tiptap-image-panel.component';
import { TiptapLinkPanelComponent } from '../link-panel/tiptap-link-panel.component';
import { ALIGN_ORDER, alignIcon as resolveAlignIcon } from '../tiptap-extensions';

/** Normalize rgb()/#rgb to the #rrggbb format required by input[type=color] */
function toHex(value: string | undefined, fallback: string): string {
  if (!value) {
    return fallback;
  }
  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) {
    return '#' + [rgb[1], rgb[2], rgb[3]].map(n => (+n).toString(16).padStart(2, '0')).join('');
  }
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    return '#' + [...value.slice(1)].map(c => c + c).join('');
  }
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    return value;
  }
  return fallback;
}

/**
 * Tiptap bubble toolbar, shared by the canvas inline editor (InlineEditorService)
 * and the tiptap-editor comb; the element is handed to the BubbleMenu extension
 * for positioning and visibility (it appears when text is selected).
 * Panels never use mat-menu/overlay — they steal the editor's focus and trigger
 * a blur commit.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-bubble-menu',
  templateUrl: './tiptap-bubble-menu.component.html',
  styleUrl: './tiptap-bubble-menu.component.scss',
  host: {
    '(mousedown)': 'onMousedown($event)',
  },
  imports: [
    TranslateModule,
    MatTooltipModule,
    BtnComponent,
    TiptapImagePanelComponent,
    TiptapLinkPanelComponent,
    ToolbarKeynavDirective,
  ],
  providers: [TOOLBAR_TOOLTIP_ABOVE],
})
export class TiptapBubbleMenuComponent {
  /** The currently active editor; no buttons render when null */
  readonly editor = input<Editor | null>(null);

  private cdr = inject(ChangeDetectorRef);

  /** Link editing panel (shared child component): on open it carries the link address at the cursor */
  public linkPanelOpen = signal(false);
  /** Selection-level text style panel: text color / background color / font size */
  public stylePanelOpen = signal(false);
  public readonly fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px'];
  public readonly alignIcon = resolveAlignIcon;

  constructor() {
    // Tiptap events fire outside Angular; under zoneless we must manually schedule
    // change detection to refresh button active states. Panels reset when the editor
    // switches to avoid stale state from a previous edit.
    effect(onCleanup => {
      const editor = this.editor();
      this.linkPanelOpen.set(false);
      this.stylePanelOpen.set(false);
      if (!editor) {
        return;
      }
      const refresh = (): void => this.cdr.markForCheck();
      editor.on('transaction', refresh);
      onCleanup(() => editor.off('transaction', refresh));
    });
  }

  /** Pressing a button must not steal the editor's focus, to avoid a blur commit; form controls are exempt (they need real focus) */
  onMousedown(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('input, select, label')) {
      event.preventDefault();
    }
  }

  openLinkPanel(): void {
    this.stylePanelOpen.set(false);
    this.linkPanelOpen.set(true);
  }

  closeLinkPanel(): void {
    this.linkPanelOpen.set(false);
    this.editor()?.commands.focus();
  }

  toggleStylePanel(): void {
    this.linkPanelOpen.set(false);
    this.stylePanelOpen.update(open => !open);
  }

  /** TextAlign is only registered in the multi-paragraph profiles (rich/comb); single-line titles have no paragraphs, so the align button is hidden */
  hasAlign(editor: Editor): boolean {
    return editor.extensionManager.extensions.some(ext => ext.name === 'textAlign');
  }

  /** Single-key align cycling (left -> center -> right -> justify); no mat-menu in the bubble to avoid focus stealing */
  cycleAlign(editor: Editor): void {
    const current = ALIGN_ORDER.find(align => editor.isActive({ textAlign: align })) ?? 'left';
    const next = ALIGN_ORDER[(ALIGN_ORDER.indexOf(current) + 1) % ALIGN_ORDER.length];
    editor.chain().focus().setTextAlign(next).run();
  }

  /** Current selection's text style value, hexed for input[type=color] echo */
  colorValue(editor: Editor, attr: 'color' | 'backgroundColor', fallback: string): string {
    return toHex(editor.getAttributes('textStyle')[attr], fallback);
  }

  fontSizeValue(editor: Editor): string {
    return editor.getAttributes('textStyle').fontSize ?? '';
  }

  /** Live color apply: no focus() chaining, so focus is not yanked back from the native color picker mid-drag */
  applyColor(editor: Editor, value: string): void {
    editor.chain().setColor(value).run();
  }

  applyBgColor(editor: Editor, value: string): void {
    editor.chain().setBackgroundColor(value).run();
  }

  /** An empty value restores the default font size */
  applyFontSize(editor: Editor, value: string): void {
    const chain = editor.chain().focus();
    if (value) {
      chain.setFontSize(value).run();
    } else {
      chain.unsetFontSize().run();
    }
  }
}
