import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-law-card',
  templateUrl: './law-card.component.html',
  styleUrls: ['./law-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LawCardComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
