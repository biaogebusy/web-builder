import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-whychooseus',
  templateUrl: './whychooseus.component.html',
  styleUrls: ['./whychooseus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhychooseusComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
