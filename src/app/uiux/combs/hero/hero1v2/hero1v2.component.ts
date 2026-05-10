import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import type { IHero1v2 } from '@core/interface/combs/IHero';
@Component({
    selector: 'app-hero-1v2',
    templateUrl: './hero1v2.component.html',
    styleUrls: ['./hero1v2.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class Hero1v2Component {
  private cd = inject(ChangeDetectorRef);

  @Input() content: IHero1v2;
  index = 0;


  onSlideChange(event: any): void {
    this.index = event.activeIndex;
    this.cd.detectChanges();
  }
}
