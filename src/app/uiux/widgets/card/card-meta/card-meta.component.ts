import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import type { IMeta } from '@core/interface/widgets/ICard';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-card-meta',
    templateUrl: './card-meta.component.html',
    styleUrls: ['./card-meta.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardMetaComponent implements OnInit {
  private dialog = inject(MatDialog);

  @Input() content: IMeta[] | undefined;

  ngOnInit(): void {}

  onDialog(content: any): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
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
      },
    });
  }
}
