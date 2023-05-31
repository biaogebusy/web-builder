import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-card-1v5',
  templateUrl: './card1v5.component.html',
  styleUrls: ['./card1v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card1v5Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
