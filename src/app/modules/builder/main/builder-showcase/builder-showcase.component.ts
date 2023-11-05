import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() content: any;
  constructor(
    private builder: BuilderState,
    private util: UtilitiesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.builder.showcase$.next(false);
  }
  onCopy(content: any): void {
    this.util.copy(JSON.stringify(content));
    this.util.openSnackbar(`已复制${this.content.type}的JSON！`, 'ok');
  }

  showCode(content: any): void {
    this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        inputData: {
          content: {
            type: 'jsoneditor',
            data: content,
            isPreview: true,
          },
        },
      },
    });
  }
}
