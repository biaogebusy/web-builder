import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase-2v5',
  templateUrl: './showcase2v5.component.html',
  styleUrls: ['./showcase2v5.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v5Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
