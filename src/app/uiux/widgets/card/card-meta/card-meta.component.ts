import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import type { IMeta } from '@core/interface/widgets/ICard';
import { IDialog } from '@core/interface/IDialog';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { NgPipesModule } from 'ngx-pipes';
import { DialogComponent } from '../../dialog/dialog.component';
import { DynamicComponentComponent } from '../../builder/dynamic-component/dynamic-component.component';

@Component({
  selector: 'app-card-meta',
  templateUrl: './card-meta.component.html',
  styleUrls: ['./card-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, NgPipesModule, DynamicComponentComponent, SafeHtmlPipe],
})
export class CardMetaComponent {
  private dialog = inject(MatDialog);

  @Input() content: IMeta[] | undefined;


  onDialog(content: any): void {
    const config: IDialog = {
      inputData: {
        content: {
          type: 'text',
          spacer: 'none',
          title: {
            label: content.label,
            style: 'style-v4',
          },
          body: content.value,
        },
      },
    };
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: config,
    });
  }
}
