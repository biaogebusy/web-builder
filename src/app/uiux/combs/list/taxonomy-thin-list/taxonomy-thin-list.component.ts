import { Component, Input } from '@angular/core';
import type { ITaxonomyThinList } from '@core/interface/combs/IList';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
    selector: 'app-taxonomy-thin-list',
    templateUrl: './taxonomy-thin-list.component.html',
    styleUrls: ['./taxonomy-thin-list.component.scss'],
    standalone: false
})
export class TaxonomyThinListComponent extends BaseComponent {
  @Input() content: ITaxonomyThinList;

}
