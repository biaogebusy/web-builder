import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-relate',
  templateUrl: './relate.component.html',
  styleUrls: ['./relate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelateComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
