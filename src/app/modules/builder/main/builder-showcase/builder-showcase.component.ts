import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-builder-showcase',
  templateUrl: './builder-showcase.component.html',
  styleUrls: ['./builder-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderShowcaseComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
