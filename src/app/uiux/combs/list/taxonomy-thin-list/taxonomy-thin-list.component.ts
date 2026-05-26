import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { ITaxonomyThinList } from '@core/interface/combs/IList';
import { BaseComponent } from '@uiux/base/base.widget';
import { BgComponent } from '@uiux/widgets/bg/bg.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { ListThinComponent } from '../list/list-thin/list-thin.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-taxonomy-thin-list',
  templateUrl: './taxonomy-thin-list.component.html',
  styleUrls: ['./taxonomy-thin-list.component.scss'],
  imports: [BgComponent, DynamicComponentComponent, ListThinComponent],
})
export class TaxonomyThinListComponent extends BaseComponent {
  @Input() content: ITaxonomyThinList;

}
