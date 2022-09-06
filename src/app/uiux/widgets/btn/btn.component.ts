import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
