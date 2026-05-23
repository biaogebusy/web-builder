import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  output,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import type { IMark } from '@core/interface/IAmap';
import type { Card1v3Item, ICard1v3 } from '@core/interface/widgets/ICard';
import { DialogComponent } from '@uiux/widgets/dialog/dialog.component';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-card-1v3',
  templateUrl: './card1v3.component.html',
  styleUrls: ['./card1v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule, MatRippleModule, IconComponent],
})
export class Card1v3Component {
  private dialog = inject(MatDialog);
  private cd = inject(ChangeDetectorRef);

  @Input() content: ICard1v3;
  readonly selected = output<IMark>();
  selectedId: number;


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
