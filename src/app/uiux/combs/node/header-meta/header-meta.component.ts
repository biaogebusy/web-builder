import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { TextComponent } from '@uiux/widgets/text/text.component';
import { TitleComponent } from '@uiux/widgets/title/title.component';

@Component({
  selector: 'app-header-meta',
  templateUrl: './header-meta.component.html',
  styleUrls: ['./header-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent, TitleComponent],
})
export class HeaderMetaComponent {
  @Input() content: any;
  constructor() {}

}
