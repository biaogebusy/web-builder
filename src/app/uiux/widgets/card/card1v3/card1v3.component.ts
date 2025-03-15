import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import type { IMark } from '@core/interface/IAmap';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import type { Card1v3Item, ICard1v3 } from '@core/interface/widgets/ICard';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-card-1v3',
    templateUrl: './card1v3.component.html',
    styleUrls: ['./card1v3.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Card1v3Component implements OnInit {
  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);

  @Input() content: ICard1v3;
  @Output() selected = new EventEmitter();
  selectedId: number;

  ngOnInit(): void {}

  onCard(item: Card1v3Item, i: number): void {
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
        inputData: [...content],
      },
    });
  }
}
