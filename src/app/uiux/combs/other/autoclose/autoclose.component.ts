import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-autoclose',
    templateUrl: './autoclose.component.html',
    styleUrls: ['./autoclose.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AutocloseComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {
    const source = interval(2 * 1000);
    source.subscribe(() => {
      window.parent.postMessage('closeDialog', '*');
    });
  }
}
