import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html',
  styleUrls: ['./media-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaObjectComponent implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  get align(): string {
    return this.content.content ? 'start start' : 'center center';
  }
}
