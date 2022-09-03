import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-card1v2',
  templateUrl: './card1v2.component.html',
  styleUrls: ['./card1v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1v2Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
