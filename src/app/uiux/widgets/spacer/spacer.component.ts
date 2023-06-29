import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

interface ISpacer {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
}
@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacerComponent implements OnInit {
  // content and size 是兼容写法
  @Input() content: ISpacer;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  constructor() {}

  ngOnInit(): void {}
}
