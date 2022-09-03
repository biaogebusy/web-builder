import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-law-tab',
  templateUrl: './law-tab.component.html',
  styleUrls: ['./law-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawTabComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
