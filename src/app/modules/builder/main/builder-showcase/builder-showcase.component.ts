import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IBuilderShowcase } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderShowcaseComponent {
  @Input() content: IBuilderShowcase;

  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private dialog = inject(MatDialog);
  private screenService = inject(ScreenService);

  onClose(): void {
    this.builder.showcase$.next(false);
  }
  onCopy(component: any): void {
    this.util.copy(JSON.stringify(component));
    this.util.openSnackbar(`已复制${component.type}的JSON！`, 'ok');
  }

  showCode(component: any): void {
    this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        inputData: {
          content: {
            type: 'jsoneditor',
            data: component,
          },
        },
      },
    });
  }

  insert(widget: any): void {
    this.builder.pushComponent(widget);
    setTimeout(() => {
      const length = this.builder.currentPage.body.length;
      this.screenService.scrollToAnchor(`item-${length - 1}`);
      this.builder.cancelFixedShowcase();
      this.onClose();
    }, 200);
  }
}
