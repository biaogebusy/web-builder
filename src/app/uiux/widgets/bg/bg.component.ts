import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgComponent implements OnInit {
  @Input() content: any;
  @Input() classes: any;
  constructor() {}

  ngOnInit(): void {}
}
