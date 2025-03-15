import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IChipList } from '@core/interface/widgets/IChipList';

@Component({
    selector: 'app-chip-list',
    templateUrl: './chip-list.component.html',
    styleUrls: ['./chip-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ChipListComponent implements OnInit {
  @Input() content: IChipList;
  @Input() classes: object | string;

  constructor() {}

  ngOnInit(): void {}
}
