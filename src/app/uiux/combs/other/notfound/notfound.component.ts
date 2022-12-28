import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-404',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
