import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IMark } from '@core/interface/IAmap';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { TextComponent } from '@uiux/widgets/text/text.component';

@Component({
  selector: 'app-card1v3',
  templateUrl: './card1v3.component.html',
  styleUrls: ['./card1v3.component.scss'],
})
export class Card1v3Component implements OnInit {
  @Input() content: any;
  @Output() selected = new EventEmitter();
  selectedId: number;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onClick(item: any, i: number): void {
    this.selectedId = i;
    if (item.dialog) {
      this.openDialog(item);
      return;
    }
    this.selected.emit({ item, index: i } as IMark);
  }

  openDialog(item: any): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        renderInputComponent: TextComponent,
        inputData: {
          content: {
            type: 'text',
            spacer: 'none',
            title: {
              label: item.title,
              style: 'style-v4',
            },
            body: item.dialog.content,
          },
        },
      },
    });
  }
}
