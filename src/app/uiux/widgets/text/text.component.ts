import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { IText } from '@core/interface/widgets/IText';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';
import { TitleComponent } from '../title/title.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    TitleComponent,
    DynamicComponentComponent,
    ContenteditDirective,
    SafeHtmlPipe,
  ],
})
export class TextComponent {
  readonly content = input<IText>();

}
