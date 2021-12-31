import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-search-status',
  templateUrl: './search-status.component.html',
  styleUrls: ['./search-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchStatusComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
