import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase-3v4',
  templateUrl: './showcase3v4.component.html',
  styleUrls: ['./showcase3v4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v4Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
