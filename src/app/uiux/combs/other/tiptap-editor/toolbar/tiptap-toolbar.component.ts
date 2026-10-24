import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { TOOLBAR_TOOLTIP_ABOVE } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

/** Basic commands shared by rich-text hosts; each host owns execution and validation. */
export type TiptapToolbarAction = 'undo' | 'redo' | 'bold' | 'italic' | 'underline' |
  'bulletList' | 'orderedList' | 'link';
/** Controls that a host can disable for its current selection. */
export type TiptapToolbarControl = TiptapToolbarAction | 'heading';
/** Detached toolbar state. No editor instance or document content crosses this boundary. */
export interface TiptapToolbarState {
  /** Whether history commands are available. */
  undo: boolean;
  /** Whether a previously undone change can be restored. */
  redo: boolean;
  /** Semantic heading level; zero selects a paragraph. */
  heading: number;
  /** Whether the selection is bold. */
  bold: boolean;
  /** Whether the selection is italic. */
  italic: boolean;
  /** Whether the selection is underlined. */
  underline: boolean;
  /** Whether the selection is in a bulleted list. */
  bulletList: boolean;
  /** Whether the selection is in an ordered list. */
  orderedList: boolean;
  /** Whether the selection contains a link. */
  link: boolean;
}

@Component({
  selector: 'app-tiptap-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatTooltipModule, TranslateModule,
    BtnComponent, IconComponent],
  templateUrl: './tiptap-toolbar.component.html',
  styleUrl: './tiptap-toolbar.component.scss',
  providers: [TOOLBAR_TOOLTIP_ABOVE],
  host: { '(mousedown)': 'preserveSelection($event)' },
})
export class TiptapToolbarComponent {
  /** Current selection and undo/redo state supplied by the editor host. */
  readonly state = input.required<TiptapToolbarState>();
  /** Unsupported controls remain visible but cannot run in the current context. */
  readonly disabled = input<readonly TiptapToolbarControl[]>([]);
  /** The host executes the command, including opening its own link editor. */
  readonly action = output<TiptapToolbarAction>();
  /** The host applies a semantic heading or paragraph. */
  readonly headingChange = output<number>();
  readonly headingControl = new FormControl(0, { nonNullable: true });
  readonly headings = [0, 1, 2, 3, 4, 5, 6];
  readonly formats = [
    { action: 'bold', label: 'BOLD', icon: 'format-bold' },
    { action: 'italic', label: 'ITALIC', icon: 'format-italic' },
    { action: 'underline', label: 'UNDERLINE', icon: 'format-underline' },
    { action: 'bulletList', label: 'BULLET_LIST', icon: 'format-list-bulleted' },
    { action: 'orderedList', label: 'ORDERED_LIST', icon: 'format-list-numbered' },
  ] as const;

  constructor() {
    effect(() => {
      this.headingControl.setValue(this.state().heading, { emitEvent: false });
      if (this.disabled().includes('heading')) this.headingControl.disable({ emitEvent: false });
      else this.headingControl.enable({ emitEvent: false });
    });
  }

  /** Pointer commands preserve the selection; keyboard users can still focus every control. */
  preserveSelection(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button')) event.preventDefault();
  }
}
