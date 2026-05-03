import { Component, Input } from '@angular/core';
import type { IText } from '@core/interface/widgets/IText';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss'],
    standalone: false
})
export class TextComponent {
  @Input() content: IText;

}
