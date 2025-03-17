import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
@Component({
    selector: 'app-search-header',
    templateUrl: './search-header.component.html',
    styleUrls: ['./search-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SearchHeaderComponent implements OnInit {
  @Input() content: any;
  @Input() filterForm: any;
  @Input() form: UntypedFormGroup;

  formControl: any;

  constructor() {}

  ngOnInit(): void {}
}
