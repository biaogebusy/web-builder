import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-showcase3v3',
  templateUrl: './showcase3v3.component.html',
  styleUrls: ['./showcase3v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase3v3Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}

  showImage(): boolean {
    if (!this.content?.showImage && this.content.feature) {
      return true;
    }
    if (this.content.showImage === false) {
      return false;
    }
    return true;
  }
}
