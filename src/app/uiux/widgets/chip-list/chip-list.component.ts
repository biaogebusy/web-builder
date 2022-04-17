import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IChipList } from '@core/interface/widgets/IChipList';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipListComponent implements OnInit {
  @Input() content: any;
  @Input() classes: any;

  constructor() {}

  ngOnInit(): void {}
}
