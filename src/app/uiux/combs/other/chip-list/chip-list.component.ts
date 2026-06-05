import {
  ChangeDetectionStrategy,
  Component,
  input
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import type { IChipList } from '@core/interface/widgets/IChipList';
import { LinkComponent } from '@uiux/widgets/link/link.component';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, LinkComponent],
})
export class ChipListComponent {
  readonly content = input<IChipList>();
  readonly classes = input<object | string>();

  constructor() {}

}
