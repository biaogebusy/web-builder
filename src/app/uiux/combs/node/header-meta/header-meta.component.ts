import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-header-meta',
  templateUrl: './header-meta.component.html',
  styleUrls: ['./header-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMetaComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
