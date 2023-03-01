import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IRelateShowcase } from '@core/interface/node/IRelate';

@Component({
  selector: 'app-relate-showcase',
  templateUrl: './relate-showcase.component.html',
  styleUrls: ['./relate-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelateShowcaseComponent implements OnInit {
  @Input() content: IRelateShowcase;
  constructor() {}

  ngOnInit(): void {}
}
