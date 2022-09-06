import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase2v4',
  templateUrl: './showcase2v4.component.html',
  styleUrls: ['./showcase2v4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase2v4Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
