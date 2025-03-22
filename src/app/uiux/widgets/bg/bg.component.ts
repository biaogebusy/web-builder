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
    this.classes.set(`${this.content.classes} ${this.content.overlay}`);
  }
}
