import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-font-change',
  templateUrl: './font-change.component.html',
  styleUrls: ['./font-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontChangeComponent implements OnInit {
  constructor(public appState: AppState) {}
  @Input() content: any;
  @Input() form: FormGroup;

  ngOnInit(): void {}
}
