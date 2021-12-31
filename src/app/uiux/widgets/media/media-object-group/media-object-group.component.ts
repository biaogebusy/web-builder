import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-media-object-group',
  templateUrl: './media-object-group.component.html',
  styleUrls: ['./media-object-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaObjectGroupComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
