import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-space-between',
  templateUrl: './space-between.component.html',
  styleUrls: ['./space-between.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceBetweenComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
