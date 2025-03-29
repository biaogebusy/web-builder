import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import type { IBg } from '@core/interface/widgets/IBg';

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BgComponent implements OnInit {
  @Input() content: IBg;
  public classes = signal<string>('');

  ngOnInit(): void {
    const { classes, variant, overlay } = this.content;
    this.classes.set(`${classes}${variant ? `-${variant}` : ''} ${overlay} bg-fill-width`);
  }
}
