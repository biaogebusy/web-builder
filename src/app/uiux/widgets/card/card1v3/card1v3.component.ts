import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import type { IMark } from '@core/interface/IAmap';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { LoopWidgetsComponent } from '@uiux/widgets/loop-widgets/loop-widgets.component';

@Component({
  selector: 'app-card1v3',
  templateUrl: './card1v3.component.html',
  styleUrls: ['./card1v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1v3Component implements OnInit {
  @Input() content: any;
  @Output() selected = new EventEmitter();
  selectedId: number;

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onCard(item: any, i: number): void {
    this.selectedId = i;
    if (item.dialog) {
      this.openDialog(item.dialog);
      return;
    }
    this.selected.emit({ item, index: i } as IMark);
    this.cd.detectChanges();
  }

  openDialog(content: any): void {
    this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        renderInputComponent: LoopWidgetsComponent,
        inputData: {
          content,
        },
      },
    });
  }
}
