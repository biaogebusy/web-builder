import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type { IBuilderShowcase } from '@core/interface/IBuilder';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderShowcaseComponent implements OnInit {
  @Input() content: IBuilderShowcase;
  component: any;
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private dialog = inject(MatDialog);
  private screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.component = cloneDeep(this.content.card.components[0]);
    }
  }

  onClose(): void {
    this.builder.showcase$.next(false);
  }
  onCopy(): void {
    this.util.copy(JSON.stringify(this.component));
    this.util.openSnackbar(`已复制${this.component.type}的JSON！`, 'ok');
  }

  showCode(): void {
    this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        inputData: {
          content: {
            type: 'jsoneditor',
            data: this.component,
          },
        },
      },
    });
  }

  insert(): void {
    this.builder.pushComponent(this.component);
    setTimeout(() => {
      const length = this.builder.currentPage.body.length;
      this.screenService.scrollToAnchor(`item-${length - 1}`);
      this.builder.cancelFixedShowcase();
      this.onClose();
    }, 200);
  }
}
