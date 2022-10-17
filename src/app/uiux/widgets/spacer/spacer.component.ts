import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacerComponent implements OnInit {
  @Input() size: string;
  constructor() {}

  ngOnInit(): void {}
}
