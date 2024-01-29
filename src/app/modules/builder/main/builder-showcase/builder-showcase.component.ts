import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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
export class BuilderShowcaseComponent implements OnInit {
  @Input() content: IBuilderShowcase;
  constructor(
    private builder: BuilderState,
    private util: UtilitiesService,
    private dialog: MatDialog,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {}

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
            isPreview: true,
          },
        },
      },
    });
  }

  insert(widget: any): void {
    console.log(widget);
    this.builder.pushComponent(widget);
    setTimeout(() => {
      const length = this.builder.currentPage.body.length;
      this.screenService.scrollToAnchor(`item-${length - 1}`);
      this.builder.cancelFixedShowcase();
      this.onClose();
    }, 500);
  }
}
