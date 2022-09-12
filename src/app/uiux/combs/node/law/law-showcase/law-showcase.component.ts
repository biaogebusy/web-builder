import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-law-showcase',
  templateUrl: './law-showcase.component.html',
  styleUrls: ['./law-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawShowcaseComponent implements OnInit {
  @Input() content: any;
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  trackByFn(index: number, item: any): number {
    return index;
  }
}
