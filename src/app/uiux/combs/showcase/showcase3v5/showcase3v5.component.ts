import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase-3v5',
  templateUrl: './showcase3v5.component.html',
  styleUrls: ['./showcase3v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v5Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
