import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import type { IIcon } from '@core/interface/widgets/IIcon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  @Input() content: IIcon;
  @HostBinding('class.custom-icon') hostClass = false;

  ngOnInit(): void {
    if (this.content?.svg) {
      this.hostClass = true;
    }
  }
}
