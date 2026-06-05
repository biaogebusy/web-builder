import { Component, ChangeDetectionStrategy, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { BgImgComponent } from '../bg-img/bg-img.component';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';
import { SpacerComponent } from '../spacer/spacer.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    SpacerComponent,
    BgImgComponent,
    DynamicComponentComponent,
    ContenteditDirective,
    SafeHtmlPipe,
  ],
})
export class PanelComponent {
  readonly content = input<any>();
  readonly accordion = viewChild(MatAccordion);
  isAll = false;

}
