import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-hero1v1',
  templateUrl: './hero1v1.component.html',
  styleUrls: ['./hero1v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero1v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
