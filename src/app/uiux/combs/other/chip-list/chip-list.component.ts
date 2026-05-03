import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import type { IChipList } from '@core/interface/widgets/IChipList';

@Component({
    selector: 'app-chip-list',
    templateUrl: './chip-list.component.html',
    styleUrls: ['./chip-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ChipListComponent {
  @Input() content: IChipList;
  @Input() classes: object | string;

  constructor() {}

}
