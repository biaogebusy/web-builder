import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
  @Input() content: IChipList;
  @Input() classes: object | string;

  constructor() {}

}
