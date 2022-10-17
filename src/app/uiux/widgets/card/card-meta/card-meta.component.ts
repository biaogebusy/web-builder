import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextComponent } from '../../text/text.component';
import { DialogComponent } from '../../dialog/dialog.component';
import { IMeta } from '@core/interface/widgets/IWidgets';

@Component({
  selector: 'app-card-meta',
  templateUrl: './card-meta.component.html',
  styleUrls: ['./card-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMetaComponent implements OnInit {
  @Input() content: IMeta[] | undefined;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onDialog(content: any): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        renderInputComponent: TextComponent,
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
