import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase2v2',
  templateUrl: './showcase2v2.component.html',
  styleUrls: ['./showcase2v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v2Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
