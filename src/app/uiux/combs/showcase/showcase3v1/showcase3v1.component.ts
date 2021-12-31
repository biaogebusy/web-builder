import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase3v1',
  templateUrl: './showcase3v1.component.html',
  styleUrls: ['./showcase3v1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
