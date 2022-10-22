import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { ITaxonomyThinList } from '@core/interface/combs/IList';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-taxonomy-thin-list',
  templateUrl: './taxonomy-thin-list.component.html',
  styleUrls: ['./taxonomy-thin-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonomyThinListComponent extends BaseComponent implements OnInit {
  @Input() content: ITaxonomyThinList;
  constructor() {
    super();
  }

  ngOnInit(): void {}
  trackByFn(index: number, item: any): number {
    return index;
  }
}
