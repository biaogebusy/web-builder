import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { IFixBarPopup } from '@core/interface/branding/IFixBarPopup';

@Component({
  selector: 'app-fix-bar-popup',
  templateUrl: './fix-bar-popup.component.html',
  styleUrls: ['./fix-bar-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixBarPopupComponent implements OnInit {
  @Input() content: IFixBarPopup;
  constructor() {}

  ngOnInit(): void {}
}
