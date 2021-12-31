import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-hero2v2',
  templateUrl: './hero2v2.component.html',
  styleUrls: ['./hero2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero2v2Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
