import {
  ApplicationRef,
  ComponentRef,
  DOCUMENT,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core';
import { Editor, Extensions, Node as TiptapNode } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { BuilderState } from '@core/state/BuilderState';
import { TiptapBubbleMenuComponent } from '@uiux/combs/other/tiptap-editor/bubble-menu/tiptap-bubble-menu.component';
import { buildRichExtensions } from '@uiux/combs/other/tiptap-editor/tiptap-extensions';

export type InlineEditorProfile = 'rich' | 'inline';

/**
 * Top-level document node for the inline (single-line) profile: content is
 * inline nodes directly, serialized without a wrapping <p>, matching the
 * "bare inline HTML" storage shape of title fields; block-level pastes are
 * flattened into inline content.
 */
const InlineDocument = TiptapNode.create({
  name: 'doc',
  topNode: true,
  content: 'inline*',
});

export interface IInlineEditorActivateOptions {
  /** Clicked body element on the canvas (the ContenteditDirective host) */
  element: HTMLElement;
  /**
   * Write-back path into the component config tree (produced by generatePath);
   * when omitted, the caller handles the write-back in onCommitted (e.g.
   * custom-template must splice the fragment back into the template source).
   */
  path?: string;
  /**
   * rich: multi-paragraph body (default); inline: single-line title with
   * inline marks only, Enter commits instead of splitting paragraphs, and the
   * document has no paragraph wrapper.
   */
  profile?: InlineEditorProfile;
  /** Viewport coords of the triggering click, used to place the cursor; defaults to focusing the end */
  clickCoords?: { x: number; y: number };
  onActivated?: () => void;
  /** Called only when the content changed; with a path the change is already written back to BuilderState */
  onCommitted?: (html: string) => void;
}

/**
 * Inline rich-text editing on the canvas: mounts tiptap in place on the
 * clicked body element, replacing bare contenteditable. Only one active
 * instance globally at a time; commits on blur (no write-back when
 * unchanged, avoiding extra version snapshots), cancels on Esc.
 * This service must only be dynamically imported via ContenteditDirective so
 * tiptap never enters the public-page initial bundle.
 */
@Injectable({
  providedIn: 'root',
})
export class InlineEditorService {
  private builder = inject(BuilderState);
  private appRef = inject(ApplicationRef);
  private envInjector = inject(EnvironmentInjector);
  private doc = inject<Document>(DOCUMENT);

  private editor: Editor | null = null;
  private activeElement: HTMLElement | null = null;
  private options: IInlineEditorActivateOptions | null = null;
  /** Raw HTML before mounting; restored on cancel or when unchanged */
  private originalHtml = '';
  /**
   * Baseline HTML normalized by the tiptap schema after mounting. Change
   * detection must compare against this rather than originalHtml:
   * normalization itself (e.g. bare text wrapped in <p>) is not a change,
   * otherwise every activation would produce a spurious write-back.
   */
  private initialHtml = '';
  /** Bubble toolbar component created once and reused across activations; visibility and mounting are handled by the BubbleMenu plugin */
  private bubbleRef: ComponentRef<TiptapBubbleMenuComponent> | null = null;
  private bubbleFocusOut: ((event: FocusEvent) => void) | null = null;

  /** Test and debug entry point: the currently active editor */
  get activeEditor(): Editor | null {
    return this.editor;
  }

  isActive(element: HTMLElement): boolean {
    return this.activeElement === element;
  }

  activate(options: IInlineEditorActivateOptions): void {
    const { element } = options;
    // Clicking the already active element (cursor move/text selection) must not rebuild the editor
    if (this.activeElement === element) {
      return;
    }
    // Commit the previous element before switching, keeping a single global instance
    this.commit();

    const bubbleEl = this.ensureBubble();
    const profile = options.profile ?? 'rich';
    this.options = options;
    this.activeElement = element;
    this.originalHtml = element.innerHTML;
    element.innerHTML = '';

    const editor = new Editor({
      element,
      extensions: this.buildExtensions(profile, bubbleEl),
      content: this.originalHtml,
      onBlur: ({ event }) => {
        const next = event.relatedTarget as Node | null;
        // Focus moving into the bubble (e.g. the link input) does not leave editing
        if (next && bubbleEl.contains(next)) {
          return;
        }
        // Destroying the editor synchronously inside a ProseMirror event handler is unsafe; defer to a microtask
        queueMicrotask(() => this.commit());
      },
      editorProps: {
        attributes: {
          // Style hook (see global styles.scss): inherit host typography, only strip the focus outline
          class: 'inline-tiptap',
        },
        handleKeyDown: (_view, event) => {
          if (event.key === 'Escape') {
            queueMicrotask(() => this.cancel());
            return true;
          }
          // Inline profile: Enter does not split a paragraph, it commits the edit
          if (profile === 'inline' && event.key === 'Enter') {
            queueMicrotask(() => this.commit());
            return true;
          }
          return false;
        },
      },
    });
    this.editor = editor;
    this.initialHtml = editor.getHTML();
    this.focusAt(editor, options.clickCoords);
    // Focus moving within the bubble (input to button) does not commit; commit only when leaving the bubble without returning to the editor
    this.bubbleFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && (bubbleEl.contains(next) || element.contains(next))) {
        return;
      }
      queueMicrotask(() => this.commit());
    };
    bubbleEl.addEventListener('focusout', this.bubbleFocusOut);
    this.bubbleRef?.setInput('editor', editor);
    options.onActivated?.();
  }

  /** Commit the current edit: compare against the normalized baseline and write back to BuilderState only if changed */
  commit(): void {
    const editor = this.editor;
    const options = this.options;
    if (!editor || !options) {
      return;
    }
    const html = editor.getHTML();
    const changed = html !== this.initialHtml;
    // getHTML() still returns '<p></p>' after clearing; store as empty like the tiptap-editor comb does
    const value = editor.isEmpty ? '' : html;
    this.teardown(changed ? value : this.originalHtml);
    if (changed) {
      if (options.path) {
        this.builder.updatePageContentByPath(options.path, value);
      }
      options.onCommitted?.(value);
    }
  }

  /** Discard the current edit, restore the pre-edit content, and produce no write-back */
  cancel(): void {
    if (!this.editor) {
      return;
    }
    this.teardown(this.originalHtml);
  }

  private teardown(restoreHtml: string): void {
    const bubbleEl = this.bubbleRef?.location.nativeElement as HTMLElement | undefined;
    if (bubbleEl && this.bubbleFocusOut) {
      bubbleEl.removeEventListener('focusout', this.bubbleFocusOut);
    }
    this.bubbleFocusOut = null;
    // Unbind the bubble from the editor first (effect cleanup unsubscribes from transactions), then destroy the editor
    this.bubbleRef?.setInput('editor', null);
    this.editor?.destroy();
    if (this.activeElement) {
      this.activeElement.innerHTML = restoreHtml;
    }
    this.editor = null;
    this.activeElement = null;
    this.options = null;
  }

  /** Assemble extensions for the profile; both profiles share the bubble toolbar (all buttons are inline marks) */
  private buildExtensions(profile: InlineEditorProfile, bubbleEl: HTMLElement): Extensions {
    // show() would otherwise append the bubble to the editor's parent (i.e.
    // inside the component being edited); mount on body explicitly to avoid
    // inheriting component styles or being clipped by overflow.
    const appendTo = (): HTMLElement => this.doc.body;
    if (profile === 'inline') {
      return [
        InlineDocument,
        StarterKit.configure({
          document: false,
          heading: false,
          blockquote: false,
          bulletList: false,
          orderedList: false,
          listItem: false,
          listKeymap: false,
          codeBlock: false,
          horizontalRule: false,
          hardBreak: false,
          // trailingNode appends a block node to the document end, conflicting with the inline* top-level node
          trailingNode: false,
          dropcursor: false,
          gapcursor: false,
          // Links must not navigate while editing, to avoid accidentally leaving the canvas
          link: {
            openOnClick: false,
          },
        }),
        Highlight,
        // Selection-level text styles (color/background/font size), also valid in titles; element-level styles stay with component settings
        TextStyleKit,
        BubbleMenu.configure({ element: bubbleEl, appendTo }),
      ];
    }
    // Multi-paragraph body: same recipe as the tiptap-editor comb so canvas and form editing behave identically
    return buildRichExtensions({ bubbleElement: bubbleEl, appendTo });
  }

  /** Place the cursor at the click position; fall back to the end when there is no layout environment (jsdom) or the coords are unresolvable */
  private focusAt(editor: Editor, coords?: { x: number; y: number }): void {
    let pos: number | 'end' = 'end';
    if (coords) {
      try {
        pos = editor.view.posAtCoords({ left: coords.x, top: coords.y })?.pos ?? 'end';
      } catch {
        pos = 'end';
      }
    }
    editor.commands.focus(pos);
  }

  private ensureBubble(): HTMLElement {
    if (!this.bubbleRef) {
      this.bubbleRef = createComponent(TiptapBubbleMenuComponent, {
        environmentInjector: this.envInjector,
      });
      // Attach to the change-detection tree; the host element's DOM mounting is done by the BubbleMenu plugin on show
      this.appRef.attachView(this.bubbleRef.hostView);
    }
    return this.bubbleRef.location.nativeElement;
  }
}
