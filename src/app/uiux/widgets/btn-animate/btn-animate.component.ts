import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-btn-animate',
  templateUrl: './btn-animate.component.html',
  styleUrls: ['./btn-animate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnAnimateComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
