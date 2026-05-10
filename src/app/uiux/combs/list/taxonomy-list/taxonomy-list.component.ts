import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'app-taxonomy-list',
    templateUrl: './taxonomy-list.component.html',
    styleUrls: ['./taxonomy-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TaxonomyListComponent {
  @Input() content: any;
  constructor() {}

}
