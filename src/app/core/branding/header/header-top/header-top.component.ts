import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScreenState } from '@core/mobx/screen/ScreenState';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTopComponent implements OnInit {
  @Input() content: any;
  constructor(public screen: ScreenState) {}

  ngOnInit(): void {}
}
