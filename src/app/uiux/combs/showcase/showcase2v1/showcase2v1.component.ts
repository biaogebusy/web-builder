import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
@Component({
  selector: 'app-showcase2v1',
  templateUrl: './showcase2v1.component.html',
  styleUrls: ['./showcase2v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
