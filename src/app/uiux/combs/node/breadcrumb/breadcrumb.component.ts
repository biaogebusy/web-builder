import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { ILink } from '@core/interface/widgets/ILink';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BreadcrumbComponent implements OnInit {
  @Input() content: ILink[];
  constructor() {}

  ngOnInit(): void {}
}
