import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Editor } from '@tiptap/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-image-panel',
  templateUrl: './tiptap-image-panel.component.html',
  styleUrl: './tiptap-image-panel.component.scss',
  imports: [TranslateModule, BtnComponent],
})
export class TiptapImagePanelComponent {
  readonly editor = input.required<Editor>();

  attribute(name: 'alt' | 'width' | 'height'): string {
    const value = this.editor().getAttributes('image')[name];
    return value === null || value === undefined ? '' : String(value);
  }

  apply(alt: string, width: string, height: string): void {
    this.editor()
      .chain()
      .focus()
      .updateAttributes('image', {
        alt: alt.trim(),
        width: this.dimension(width),
        height: this.dimension(height),
      })
      .run();
  }

  private dimension(value: string): number | null {
    const dimension = Number.parseInt(value, 10);
    return Number.isFinite(dimension) && dimension > 0 ? dimension : null;
  }
}
